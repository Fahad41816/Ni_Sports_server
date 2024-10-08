/* eslint-disable prefer-const */
import { FilterQuery } from 'mongoose'
import { TFacility } from './Facility.interface'
import { FacilityModel } from './Facility.model'

const CreateFacilityIntoDb = async (FacilityData: TFacility) => {
  const Result = await FacilityModel.create(FacilityData)

  return Result
}

const GetAllFacilityIntoDb = async (Search: string , page : number, Limit : number, filter: string) => {
  // Define the type for the query using Mongoose's FilterQuery with your Facility interface
  let Query: FilterQuery<TFacility> = { isDeleted: false };

  // Check if there is a search string
  if (Search) {
    Query = {
      isDeleted: false,
      $or: [
        { name: { $regex: Search, $options: 'i' } }, // 'i' flag makes the search case-insensitive
        { location: { $regex: Search, $options: 'i' } },
      ],
    };
  }

  const Page = page || 0 
  const limit =  Limit || 0
  const skip = (Page - 1) * limit 

   

  // Execute the query and get the results from the database
  const Result = await FacilityModel.find(Query).skip(skip).limit(limit);
  const TotalCount = await FacilityModel.countDocuments({ isDeleted: false});

 

  return {
    data : Result,
    Total: TotalCount
  };
};
const FindSingleFacility = async (id: string) => {
  const Result = await FacilityModel.findById(id)

  return Result
}

const UpdateFacilityIntoDb = async (
  id: string,
  UpdateData: Record<string, unknown>,
) => {
  const UpdateResult = await FacilityModel.findByIdAndUpdate(id, UpdateData, {
    new: true,
  })

  return UpdateResult
}

const DeleteFacilityIntoDb = async (id: string) => {
  const DeletedResult = await FacilityModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  )

  return DeletedResult
}

export const FacilityServices = {
  GetAllFacilityIntoDb,
  CreateFacilityIntoDb,
  UpdateFacilityIntoDb,
  DeleteFacilityIntoDb,
  FindSingleFacility,
}
