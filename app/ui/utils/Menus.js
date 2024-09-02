import { MdDashboard, MdOutlineManageAccounts, MdOutlineEmail  } from "react-icons/md";
import { AiOutlineAudit } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";

export const Menus =[
    {
        "id": 1,
        "title":"Dashboard",
        "icon":<MdDashboard />,
        "path":'/dashboard'

    },
    {
        "id":2,
        "title":"Users",
        "icon":< FiUsers/>,
        "path":'/users'
    },
    {
        "id":3,
        "title":"Vendors",
        "icon": <MdOutlineManageAccounts />,
        "path":'/vendor',

    },
    {
        "id":4,
        "title":"Emailing",
        "icon": <MdOutlineEmail />,
        "path": '/email'
    },
    {
        "id":5,
        "title":"Audit Trail",
        "icon": <AiOutlineAudit/>,
        "path": '/audit-trail'

    },
    {
        "id":6,
        "title":"Notifications",
        "icon": < IoIosNotificationsOutline />,
        "path": '/notification'
    }
]