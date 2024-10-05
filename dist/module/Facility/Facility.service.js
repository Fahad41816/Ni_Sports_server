"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityServices = void 0;
const Facility_model_1 = require("./Facility.model");
const CreateFacilityIntoDb = (FacilityData) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield Facility_model_1.FacilityModel.create(FacilityData);
    return Result;
});
const GetAllFacilityIntoDb = (Search, page, Limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    // Define the type for the query using Mongoose's FilterQuery with your Facility interface
    let Query = { isDeleted: false };
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
    const Page = page || 0;
    const limit = Limit || 0;
    const skip = (Page - 1) * limit;
    // Execute the query and get the results from the database
    const Result = yield Facility_model_1.FacilityModel.find(Query).skip(skip).limit(limit);
    const TotalCount = yield Facility_model_1.FacilityModel.countDocuments({ isDeleted: false });
    return {
        data: Result,
        Total: TotalCount
    };
});
const FindSingleFacility = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield Facility_model_1.FacilityModel.findById(id);
    return Result;
});
const UpdateFacilityIntoDb = (id, UpdateData) => __awaiter(void 0, void 0, void 0, function* () {
    const UpdateResult = yield Facility_model_1.FacilityModel.findByIdAndUpdate(id, UpdateData, {
        new: true,
    });
    return UpdateResult;
});
const DeleteFacilityIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const DeletedResult = yield Facility_model_1.FacilityModel.findByIdAndUpdate(id, {
        isDeleted: true,
    }, { new: true });
    return DeletedResult;
});
exports.FacilityServices = {
    GetAllFacilityIntoDb,
    CreateFacilityIntoDb,
    UpdateFacilityIntoDb,
    DeleteFacilityIntoDb,
    FindSingleFacility,
};
