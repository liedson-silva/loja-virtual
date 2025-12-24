import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";

const AdminPermision = ({ children }) => {
    const user = useSelector((state) => state.user);

    return (
        <>
            {isAdmin(user.role) ? (
                children
            ) : (
                <section className="min-h-[80vh] flex items-center justify-center">Acesso negado. Você não tem permissão para visualizar esta página.</section>
            )}
        </>
    );
};

export default AdminPermision;