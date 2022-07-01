import type { LinksFunction } from "@remix-run/node";
import type { FC } from "react";
import type { AnnouncementModelT } from "~/DAO/announcementDAO.server";
import type { CourseModelT } from "~/DAO/courseDAO.server";
import styles from "~/styles/announcements.css";
import { formatDate } from "~/utils/dateUtils";
import Announcement from "./AnnouncementsListItem";

type AnnouncementsContainerT = {
  title?: string;
  data: (AnnouncementModelT & {
    course: {
      title: CourseModelT["title"];
    };
  })[];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const AnnouncementsContainer: FC<AnnouncementsContainerT> = ({ title, data }) => {
  return (
    <div className="announcements-list-container">
      <div className={`${title ? "heading" : "no-heading"}`}>
        <h2>{title}</h2>
      </div>
      <div className="content">
        {data.map((x) => (
          <Announcement
            key={x.id}
            id={x.id}
            title={x.title}
            body={x.body}
            date={formatDate(new Date(x.updated_at))}
            course={x.course.title}
          />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsContainer;