import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../EventForm";

const HomePage = () => {
  const data = useRouteLoaderData("event-detail");

  return (
    <div>
      <h1>Edit Event Page</h1>
      <EventForm method="patch" event={data.event}/>
    </div>
  );
};

export default HomePage;
