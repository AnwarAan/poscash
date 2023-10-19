import * as z from "zod";

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

export const registerSchema = z.object({
  fullname: z.string().min(2, { message: "Name must be at least 2 character(s)" }),
  email: z.string().min(2, { message: "This field has to be filled." }).email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 character(s)" })
    .max(16, { message: "max 16 character(s)" }),
  // roleId: z.number(),
});

export const editSchema = z.object({
  fullname: z.string().min(2, { message: "Name must be at least 2 character(s)" }),
  email: z.string().min(2, { message: "This field has to be filled." }).email("This is not a valid email."),
  // password: z
  //   .string()
  //   .min(8, { message: "password must be at least 8 character(s)" })
  //   .max(16, { message: "max 16 character(s)" }),
  // roleId: z.number(),
  phone_number: z.string().min(8, { message: "Phone Number must be at least 8 character(s)" }),
});


export const loginSchema = z.object({
  fullname: z.string().min(3, { message: "min 3 character(s)" }),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 character(s)" })
    .max(16, { message: "max 16 character(s)" }),
});

export const sendMailSchema = z.object({
  email: z.string().min(2, { message: "This field has to be filled." }).email("This is not a valid email."),
});

export const resetPasswordSchema = z.object({
  userId: z.string(),
  token: z.string(),
  newPassword: z
    .string()
    .min(6, { message: "password must be at least 6 character(s)" })
    .max(16, { message: "max 16 character(s)" }),
  confirmPassword: z
    .string()
    .min(6, { message: "password must be at least 6 character(s)" })
    .max(16, { message: "max 16 character(s)" }),
});

export const uploadImageSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max image size is 1MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const registerProductSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 character(s)" }),
  price: z.string().min(4, { message: "Price has to be filled and over Rp.1000." }),
  imageUrl: z.string(),
  description: z
    .string()
    .min(8, { message: "description at least 8 character(s)" })
    .max(100, { message: "max 100 character(s)" }),
});

export const categorySchema = z.object({
  name: z.string().min(3, { message: "Category Name must be at least 3 character(s)" }),
});

export const biodataSchema = z.object({});
