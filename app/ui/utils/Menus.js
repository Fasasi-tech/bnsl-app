import { MdDashboard, MdOutlineManageAccounts, MdOutlineEmail  } from "react-icons/md";
import { AiOutlineAudit } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
import { FaKey } from "react-icons/fa6";

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
        "title":"Password change",
        "icon":< FaKey/>,
        "path":'/password'
    },
    {
        "id":4,
        "title":"user profile",
        "icon":< FaKey/>,
        "path":'/profile'
    },
    
    {
        "id":5,
        "title":"Vendors",
        "icon": <MdOutlineManageAccounts />,
        "path":'/vendor',

    },
    {
        "id":6,
        "title":"Emailing",
        "icon": <MdOutlineEmail />,
        "path": '/email'
    },
    {
        "id":7,
        "title":"Audit Trail",
        "icon": <AiOutlineAudit/>,
        "path": '/audit-trail'

    },
    {
        "id":8,
        "title":"Notifications",
        "icon": < IoIosNotificationsOutline />,
        "path": '/notification'
    },
    {
        "id":9,
        "title":"RFQ Responses",
        "icon": < IoIosNotificationsOutline />,
        "path": '/rfq-responses'
    },
    {
        "id":10,
        "title":"products",
        "icon": < AiOutlineProduct />,
        "path": '/products'
    }
]