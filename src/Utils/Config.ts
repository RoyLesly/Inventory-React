//const BaseUrl = "http://127.0.0.1:8000/"
const BaseUrl = "http://127.0.0.1:80/"
// const BaseUrl = "http://192.168.100.119:8000/"
// const BaseUrl = "http://192.168.100.5:8000/"
//const BaseUrl = "http://192.168.1.3:8000/"
//const BaseUrl = "http://192.168.43.89:8000/"

export const LoginUrl = BaseUrl + "user/login";
export const MeUrl = BaseUrl + "user/me";
export const CreateUserUrl = BaseUrl + "user/create-user";
export const UpdatePasswordUrl = BaseUrl + "user/update-password";
export const UsersUrl = BaseUrl + "user/users";
export const UserActivitiesUrl = BaseUrl + "user/activities-log";

export const GroupUrl = BaseUrl + "app/group";
export const CreateGroupUrl = BaseUrl + "app/group";
export const UpdateGroupUrl = BaseUrl + "app/group";
export const DeleteGroupUrl = BaseUrl + "app/group";

export const InventoryUrl = BaseUrl + "app/inventory-item";
export const CreateInventoryUrl = BaseUrl + "app/inventory-item";
export const UpdateInventoryUrl = BaseUrl + "app/inventory-item";
export const DeleteInventoryUrl = BaseUrl + "app/inventory-item";

export const CreateShopsUrl = BaseUrl + "app/shop";
export const UpdateShopsUrl = BaseUrl + "app/shop";
export const DeleteShopsUrl = BaseUrl + "app/shop";

export const InventoryCSVUrl = BaseUrl + "app/inventory-csv";
export const UploadImageUrl = BaseUrl + "app/uploads";
export const InvoiceUrl = BaseUrl + "app/invoice";
export const SummaryUrl = BaseUrl + "app/summary";
export const TopSellingUrl = BaseUrl + "app/top-selling";
export const SaleByShopUrl = BaseUrl + "app/sale-by-shop";
export const PurchaseSummaryUrl = BaseUrl + "app/purchase-summary";



