import type { TUSER } from "../db/schemas";
import type { TSELECTPARTERSHIP } from "../db/schemas/selectPartnership/selectpartnership.schema";
import type { TBUYERPARTNERSHIP, TVENDORPARTNERSHIP } from "../type/types";

export const userData = [
  {
    username: "admin",
    country: "Kashmir",
    role: "ADMIN",
    fullName: "Admin",
    email: "admin@example.com",
    password: "admin123",
    phone: "+1234567890",
    isVerified: true,
    companyName: "Admin Company",
    companyURI: "https://admin.com",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: "5c9761b1-b3a3-4483-844d-88dfcb4b6eae",
    username: "buyer",
    country: "Kashmir",
    role: "BUYER",
    fullName: "Buyer",
    email: "buyer@example.com",
    password: "buyer123",
    phone: "+1334567890",
    isVerified: true,
    companyName: "Buyer Company",
    companyURI: "https://buyer.com",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: "5c9761b1-b3a3-4483-844d-88dfcb4b6eae",
    username: "vendor",
    country: "Kashmir",
    role: "VENDOR",
    fullName: "Vendor",
    email: "vendor@example.com",
    password: "vendor123",
    phone: "+1434567890",
    isVerified: true,
    companyName: "Vendor Company",
    companyURI: "https://vendor.com",
    createdAt: new Date(),
    updatedAt: new Date()
  }
] as TUSER[];

export const partnershipData = [
  {
    userId: "5c9761b1-b3a3-4483-844d-88dfcb4b6eae",
    partnershipName: "DKC_DROP_SHIPPING" as TBUYERPARTNERSHIP,
    unlockedByPayment: false,
    unlockedAt: new Date(),
    completed: false,
    retentionPeriod: 0,
    kpiPoints: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: "5c9761b1-b3a3-4483-844d-88dfcb4b6eae",
    partnershipName: "DKC_E_COMMERCE" as TVENDORPARTNERSHIP,
    unlockedByPayment: false,
    unlockedAt: new Date(),
    completed: false,
    requiredRetentionPeriod: 0,
    requiredKpiPoints: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
] as TSELECTPARTERSHIP[];
