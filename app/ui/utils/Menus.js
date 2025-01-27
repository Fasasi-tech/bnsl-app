import { MdDashboard, MdOutlineManageAccounts, MdOutlineEmail  } from "react-icons/md";
import { AiOutlineAudit } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
import { FaKey } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";

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
        "title":"products",
        "icon": < AiOutlineProduct />,
        "path": '/products'
    },
    {
        "id":14,
        "title":"products",
        "icon": < AiOutlineProduct />,
        "path": '/procurement'
    },
    {
        "id":4,
        "title":"Change password",
        "icon":< FaKey/>,
        "path":'/password'
    },
    {
        "id":5,
        "title":"Profile",
        "icon":< ImProfile/>,
        "path":'/profile'
    },
    {
        "id":6,
        "title":"Customer",
        "icon":< ImProfile/>,
        "path":'/customer'
    },
    
    {
        "id":7,
        "title":"Vendors",
        "icon": <MdOutlineManageAccounts />,
        "path":'/vendor',

    },
    {
        "id":8,
        "title":"Emailing",
        "icon": <MdOutlineEmail />,
        "path": '/email'
    },
    {
        "id":9,
        "title":"Audit Trail",
        "icon": <AiOutlineAudit/>,
        "path": '/audit-trail'

    },
    {
        "id":10,
        "title":"Notifications",
        "icon": < IoIosNotificationsOutline />,
        "path": '/notification'
    },
    {
        "id":11,
        "title":"RFQ Responses",
        "icon": < IoIosNotificationsOutline />,
        "path": '/rfq-responses'
    },
    {
        "id":12,
        "title":"RFQs",
        "icon": < IoIosNotificationsOutline />,
        "path": '/rfqs'
    },
    {
        "id":13,
        "title":"Settings",
        "icon": < IoIosNotificationsOutline />,
        "path": '/settings'
    },
   
]