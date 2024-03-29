import type { LinksFunction } from "@remix-run/node";
import type { FC } from "react";
import type { AnnouncementModelT } from "~/DAO/announcementDAO.server";
import styles from "~/styles/announcements.css";
import modalStyles from "~/styles/modal.css";
import { formatDate } from "~/utils/dateUtils";

type AnnouncementT = {
  data: AnnouncementModelT;
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: modalStyles },
  ];
};

const Announcement: FC<AnnouncementT> = ({ data }) => {
  return (
    <div className="announcement-container">
      <div className="content">
        <div className="body">{data.body}</div>
        <div className="meta-data">{formatDate(new Date(data.created_at))}</div>
      </div>
    </div>
  );
};

export default Announcement;
