/* eslint-disable @typescript-eslint/no-explicit-any */
import CatchAsync from '../../utils/CatchAsync'
import { FacilityServices } from './Facility.service'

const GetAllFacility = CatchAsync(async (req, res) => {
  
  
  const Search : any  = req.query.search
  const page : any = req.query.page
  const limit : any = req.query.limit
  const filter : any = req.query.filter
 

  const AllFacility = await FacilityServices.GetAllFacilityIntoDb(Search , page, limit, filter)

  if (AllFacility.data.length == 0) {
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'No Data Found',
      data: AllFacility,
    })
  }

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Facilitys retrieved successfully',
    data: AllFacility
  })
})

const GetSingleFacility = CatchAsync(async (req, res) => {
  const FacilityId = req.params.id;

  const FacilityResult = await FacilityServices.FindSingleFacility(FacilityId);

  // Check if no facility is found
  if (!FacilityResult) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: FacilityResult,
    });
  }

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Facility retrieved successfully',
    data: FacilityResult,
  });
});


const CreateFacility = CatchAsync(async (req, res) => {
  const FacilityData = req.body
  const FacilityResult =
    await FacilityServices.CreateFacilityIntoDb(FacilityData)

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Facility added successfully',
    data: FacilityResult,
  })
})

const UpdaatefaclityData = CatchAsync(async (req, res) => {
  const id = req.params.id
  const updateData = req.body

  const Result = await FacilityServices.UpdateFacilityIntoDb(id, updateData)

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Facility updated successfully',
    data: Result,
  })
})

const DeleteFacility = CatchAsync(async (req, res) => {
  const DeletedFacilityId = req.params.id

  const DeletedResult =
    await FacilityServices.DeleteFacilityIntoDb(DeletedFacilityId)

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Facility deleted successfully',
    data: DeletedResult,
  })
})

export const FacilityController = {
  CreateFacility,
  UpdaatefaclityData,
  DeleteFacility,
  GetAllFacility,
  GetSingleFacility,
}
