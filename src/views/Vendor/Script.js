export const createObject = (values) => {
    const formData = new FormData();
    formData.append("name", values.Name);
    formData.append("email", values.Email);
    formData.append("cnic", values.CNIC);
    formData.append("password", values.Password);
    formData.append("phone", values.Phone);
    formData.append("shopName", values['Shop Name']);
    formData.append("city", values.City);
    formData.append("address", values.Address);
    formData.append("image", values["Vendor Pic"]);

    return formData;
}