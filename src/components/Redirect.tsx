import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
type Props = {
  to: string;
};

const Redirect = ({ to }: Props) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    }, [to, navigate]);
    return null;
    }

export default Redirect;

