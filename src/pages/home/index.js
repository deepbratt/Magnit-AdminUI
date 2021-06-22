import { Typography } from "@material-ui/core";
import OnlyTextForm from "../../components/OnlyTextForm/OnlyTextForm";
import { apiFieldNames } from "../../Utils/Text";

const Home = () => {
  return (
    <div>
      <Typography>Hello, Admin</Typography>
      {/* <OnlyTextForm clearItemId={()=>null} apiFieldNames={apiFieldNames.faq}/> */}
    </div>
  );
};

export default Home;
