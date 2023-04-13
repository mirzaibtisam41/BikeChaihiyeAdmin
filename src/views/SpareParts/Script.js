export const createObject = (values) => {
    const formData = new FormData();
    formData.append("name", values.Name);
    formData.append("detail", values.Detail);
    formData.append("brand", values.Brand);
    formData.append("category", values.Category);
    formData.append("price", values.Price);
    formData.append("discount", values.Discount);
    formData.append("active", values.Active);
    formData.append("types", values.Types);
    for (const key in values["Part Pic"]) {
        formData.append("partPic", values["Part Pic"][key]);
    }

    return formData;
}