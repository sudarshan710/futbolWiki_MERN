import { useDispatch } from "react-redux";
import { setLogout } from "state/index.js";
import { useNavigate } from "react-router-dom";
import { Search, Add } from "@mui/icons-material";
import { Input, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);

  return (
    <div className=" p-2 w-[700px] text-white">
      <div className="flex items-center text-white  place-content-center ">
        <Typography
          fontFamily="Young Serif"
          padding="0rem 0.4rem"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          futbolWiki
        </Typography>

        <div className="relative ml-4 mr-4">
          <Input
            placeholder="Search Lionel Messi..."
            className="text-[#1f1f1f]  bg-[#00d5fa] rounded-md"
            style={{ "::placeholder": { color: "blue" } }}
            endAdornment={
              <IconButton>
                <Search sx={{ color: "black" }} />
              </IconButton>
            }
          />
          {/* White border line
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white" /> */}
        </div>

        <div className="flex items-center">
          <IconButton>
            <Add sx={{ color: "white" }} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => dispatch(setLogout())}
            className="mr-4"
          >
            <LogoutIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
