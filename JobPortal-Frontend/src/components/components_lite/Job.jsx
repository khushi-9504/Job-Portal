import React from "react";
import { Button } from "../ui/button";
import { Bookmark, BookMarked } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const {
    company,
    title,
    description,
    position,
    salary,
    location,
    jobType,
    _id,
  } = job;

  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "... More";
    }
    return text;
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl shadow-blue-200 hover:p-3">
      <div className="flex items-center justify-between ">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          {isBookmarked ? <BookMarked /> : <Bookmark />}
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={company.logo}></AvatarImage>
          </Avatar>
        </Button>

        <div>
          <h1 className="text-lg font-medium">{company?.name}</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>

      <div>
        <div>
          <h1 className="font-bold text-lg my-2">{title}</h1>
          <div className="h-[60px] overflow-hidden">
            <p className="text-sm text-gray-600">
              {truncateText(description, 100)}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center mt-4">
          <Badge className={"text-blue-600 font-bold"} variant="ghost">
            {position} Open Positions
          </Badge>

          <Badge className={"text-[#FA4F00] font-bold"} variant="ghost">
            {salary} LPA
          </Badge>

          <Badge className={"text-[#6B3AC2] font-bold"} variant="ghost">
            {location}
          </Badge>

          <Badge className={"text-black font-bold"} variant="ghost">
            {jobType}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          className=" bg-[#FA4F09] font-bold rounded-sm"
          onClick={() => {
            navigate(`/description/${_id}`);
          }}
        >
          Details
        </Button>

        {/* <Button
          variant="outline"
          className=" bg-[#6B3AC2] text-white font-bold rounded-sm"
        >
          Save for Later
        </Button> */}
      </div>
    </div>
  );
};

export default Job;
