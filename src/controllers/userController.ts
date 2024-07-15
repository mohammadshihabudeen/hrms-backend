import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/Users";
import { JobTitles } from "../entities/JobTitles";
import { JobRoles } from "../entities/JobRoles";
import { MaritalStatuses } from "../entities/MaritalStatuses";
import { Countries } from "../entities/Countries";
import { Departments } from "../entities/Departments";
import { Locations } from "../entities/Locations";
import Employee from "../modals/employeeModels";
const userRepository = AppDataSource.getRepository(Users);
const jobTitleRepository = AppDataSource.getRepository(JobTitles);
const jobRoleRepository = AppDataSource.getRepository(JobRoles);
const maritalStatusRepository = AppDataSource.getRepository(MaritalStatuses);
const countryRepository = AppDataSource.getRepository(Countries);
const departmentRepository = AppDataSource.getRepository(Departments);
const locationRepository = AppDataSource.getRepository(Locations);

export const getDefaults = async (req: Request, res: Response) => {
  try {
    const jobTitles = await jobTitleRepository.find();
    const jobRoles = await jobRoleRepository.find();
    const maritalStatuses = await maritalStatusRepository.find();
    const countries = await countryRepository.find();
    const departments = await departmentRepository.find();
    const locations = await locationRepository.find();

    res.json({
      jobTitles,
      jobRoles,
      maritalStatuses,
      countries,
      departments,
      locations,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching default values", error });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
      relations: [
        "jobTitle",
        "jobRole",
        "maritalStatus",
        "country",
        "department",
        "location",
      ],
    });
    const transformData = (data: any): Employee => {
      return {
        id: data.userId.toString(),
        email: data.email,
        employeeName: data.employeeName,
        profile: data.profile,
        jobTitle: data.jobTitle.title,
        jobRole: data.jobRole.Role,
        salary: data.salary.toString(),
        hireDate: data.hireDate,
        contract: data.contract,
        maritalStatus: data.maritalStatus.status,
        degree: data.degree,
        location: data.location.name,
        dob: data.dob,
        country: data.country.name,
        phone: data.phone.toString(),
        department: data.department.name,
      };
    };

    const employees: Employee[] = users.map(transformData);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const user = await userRepository.findOne({
      where: { userId: id },
      relations: [
        "jobTitle",
        "jobRole",
        "maritalStatus",
        "country",
        "department",
        "location",
      ],
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const {
    employeeName,
    profile,
    jobTitle,
    jobRole,
    salary,
    hireDate,
    contract,
    maritalStatus,
    degree,
    country,
    department,
    location,
    createdBy,
    phone,
    dob,
  } = req.body;

  try {
    const jobTitleEntity = await jobTitleRepository.findOneBy({
      title: jobTitle,
    });
    const jobRoleEntity = await jobRoleRepository.findOneBy({ Role: jobRole });
    const maritalStatusEntity = await maritalStatusRepository.findOneBy({
      status: maritalStatus,
    });
    const countryEntity = await countryRepository.findOneBy({ name: country });
    const departmentEntity = await departmentRepository.findOneBy({
      name: department,
    });
    const locationEntity = await locationRepository.findOneBy({
      name: location,
    });

    if (
      !jobTitleEntity ||
      !jobRoleEntity ||
      !maritalStatusEntity ||
      !countryEntity ||
      !departmentEntity ||
      !locationEntity
    ) {
      return res.status(400).json({ message: "Invalid related entity data" });
    }

    const user = new Users();
    user.employeeName = employeeName;
    user.profile = profile;
    user.jobTitle = jobTitleEntity;
    user.jobRole = jobRoleEntity;
    user.salary = salary;
    user.hireDate = hireDate;
    user.contract = contract;
    user.maritalStatus = maritalStatusEntity;
    user.degree = degree;
    user.country = countryEntity;
    user.department = departmentEntity;
    user.location = locationEntity;
    user.createdBy = createdBy;
    user.phone = phone;
    user.dob = dob;

    await userRepository.save(user);
    const users = await userRepository.find({
      relations: [
        "jobTitle",
        "jobRole",
        "maritalStatus",
        "country",
        "department",
        "location",
      ],
    });
    const transformData = (data: any): Employee => {
      return {
        id: data.userId.toString(),
        employeeName: data.employeeName,
        email: data.email,
        profile: data.profile,
        jobTitle: data.jobTitle.title,
        jobRole: data.jobRole.Role,
        salary: data.salary.toString(),
        hireDate: data.hireDate,
        contract: data.contract,
        maritalStatus: data.maritalStatus.status,
        degree: data.degree,
        location: data.location.name,
        dob: data.dob,
        country: data.country.name,
        phone: data.phone.toString(),
        department: data.department.name,
      };
    };

    const employees: Employee[] = users.map(transformData);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await userRepository.findOneBy({ userId: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      employeeName,
      profile,
      jobTitle,
      jobRole,
      salary,
      hireDate,
      contract,
      maritalStatus,
      degree,
      country,
      department,
      location,
      updatedBy,
      dob,
      phone,
    } = req.body;

    // Validate required fields if necessary
    if (!employeeName || !jobTitle || !jobRole || !dob || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch related entities by their names
    const jobTitleEntity = await jobTitleRepository.findOneBy({
      title: jobTitle,
    });
    const jobRoleEntity = await jobRoleRepository.findOneBy({ Role: jobRole });
    const maritalStatusEntity = await maritalStatusRepository.findOneBy({
      status: maritalStatus,
    });
    const countryEntity = await countryRepository.findOneBy({ name: country });
    const departmentEntity = await departmentRepository.findOneBy({
      name: department,
    });
    const locationEntity = await locationRepository.findOneBy({
      name: location,
    });

    if (
      !jobTitleEntity ||
      !jobRoleEntity ||
      !maritalStatusEntity ||
      !countryEntity ||
      !departmentEntity ||
      !locationEntity
    ) {
      return res.status(400).json({ message: "Invalid related entity data" });
    }

    // Update user fields with entity IDs
    user.employeeName = employeeName;
    user.profile = profile;
    user.jobTitle = jobTitleEntity;
    user.jobRole = jobRoleEntity;
    user.salary = salary;
    user.hireDate = hireDate;
    user.contract = contract;
    user.maritalStatus = maritalStatusEntity;
    user.degree = degree;
    user.country = countryEntity;
    user.department = departmentEntity;
    user.location = locationEntity;
    user.updatedBy = updatedBy;
    user.dob = dob;
    user.phone = phone;

    // Save the updated user
    await userRepository.save(user);

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await userRepository.delete(id);
    if (result.affected === 1) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
