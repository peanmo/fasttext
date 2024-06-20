import { ObjectId } from "mongodb"
import clientPromise from "./mongo"
import { DocumentWithStatus } from "./types"
export async function getDocsWithLatestStatusAndUserId(status:string,id:string){
    try{
        const mongoClient = await clientPromise
        await mongoClient.connect()
        const docs = await mongoClient.db("nmo").collection("Status").aggregate([
            {
              $group: {
                _id: "$documentId",
                name: {
                  $last: "$name",
                },
                date: {
                  $last: "$date",
                },
                updatedByUserId: {
                  $last: "$updatedByUserId",
                },
              },
            },
            {
              $match:
                {
                  name: status,
                },
            },
            {
              $lookup: {
                from: "Document",
                localField: "_id",
                foreignField: "_id",
                as: "result",
              },
            },
            {
              $unwind: {
                path: "$result",
                preserveNullAndEmptyArrays: false,
              },
            },
            {
              $project: {
                _id: "$result._id",
                docNo: "$result.docNo",
                year: "$result.year",
                type: "$result.type",
                name: "$result.name",
                amount: "$result.amount",
                note: "$result.note",
                date: "$result.date",
                userId: "$result.userId",
                fromSectionId: "$result.fromSectionId",
              },
            },
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  userId: new ObjectId(id)
                },
            },
            {
              $lookup: {
                from: "Status",
                localField: "_id",
                foreignField: "documentId",
                pipeline: [
                  {
                    $sort: {
                      date: -1,
                    },
                  },
                  {
                    $project: {
                      _id: 0,
                      name: 1,
                    },
                  },
                ],
                as: "status",
              },
            },
            {
              $lookup: {
                from: "User",
                localField: "userId",
                foreignField: "_id",
                pipeline: [
                  {
                    $project: {
                      _id: 0,
                      hashedPassword: 0,
                      sectionId: 0,
                      role: 0,
                      suspend: 0,
                      tel: 0,
                    },
                  },
                ],
                as: "user",
              },
            },
            {
              $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                _id: 0,
                id: {
                  $toString: "$_id",
                },
                docNo: 1,
                type: 1,
                name: 1,
                amount: 1,
                note: 1,
                status: 1,
                user: 1,
                fromSection: 1,
                year: 1,
                date: 1,
              },
            },
          ]
        ).toArray() as unknown as DocumentWithStatus[]
        return docs
    }catch(e){
        console.log(e)
        return []
    }
}