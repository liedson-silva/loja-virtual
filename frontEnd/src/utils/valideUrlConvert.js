export const valideUrlConvert = (name) => {
    const url = name?.toString().replaceAll(" ", "-").replaceAll(",", "-").replaceAll("&", "-");
    return url;
};