"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoute = void 0;
const express_1 = __importDefault(require("express"));
const Facility_controller_1 = require("./Facility.controller");
const auth_1 = __importDefault(require("../../MeddleWare/auth"));
const Router = express_1.default.Router();
Router.get('/', Facility_controller_1.FacilityController.GetAllFacility);
Router.get('/:id', Facility_controller_1.FacilityController.GetSingleFacility);
Router.post('/', (0, auth_1.default)('admin'), Facility_controller_1.FacilityController.CreateFacility);
Router.put('/:id', (0, auth_1.default)('admin'), Facility_controller_1.FacilityController.UpdaatefaclityData);
Router.delete('/:id', (0, auth_1.default)('admin'), Facility_controller_1.FacilityController.DeleteFacility);
exports.FacilityRoute = Router;
