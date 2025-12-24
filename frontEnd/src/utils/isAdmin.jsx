const isAdmin = (user) => {
    if (user === 'ADMIN'){
        return true;
    };
    return false;
};

export default isAdmin;
