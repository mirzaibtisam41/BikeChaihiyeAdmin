export const createObject = (values) => {
    const formData = new FormData();
    formData.append("brand", values.Name);
    formData.append("brandPic", values["Brand Pic"]);

    return formData;
}