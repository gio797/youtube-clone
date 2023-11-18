import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loginFailure, logout } from "../redux/userSlice";
import axios from "axios";

type Props = {};

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-inline: 20px;
  position: relative;
  height: 100%;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500px;
  cursor: pointer;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

function Navbar({}: Props) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(logout(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchOutlinedIcon />
        </Search>
        {currentUser ? (
          <User>
            <VideoCallOutlinedIcon />
            <Avatar src={currentUser.img} />
            {currentUser.name}
            <Button onClick={handleLogout}>
              <AccountCircleOutlinedIcon /> Log out
            </Button>
          </User>
        ) : (
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon /> SIGN IN
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
}

export default Navbar;
