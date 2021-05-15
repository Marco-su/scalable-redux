import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifySession } from "../../store/actions/user.actions";

const Message = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifySession());
  }, [dispatch]);

  const message = useSelector((store) => store.userStatus.message);

  return (
    <div>
      <span>{message}</span>
    </div>
  );
};

export default Message;
