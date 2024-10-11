import { MdDashboard, MdOutlineManageAccounts, MdOutlineEmail  } from "react-icons/md";
import { AiOutlineAudit } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";

export const Menus =[
    {
        "id": 1,
        "title":"Product",
        "icon":<MdDashboard />,
        "path":'/vendor-products'

    },
    {
        "id": 2,
        "title":"Profile",
        "icon":<MdDashboard />,
        "path":'/vendor-profile'

    },
    {
        "id": 3,
        "title":"RFQ",
        "icon":<MdDashboard />,
        "path":'/rfq'

    },
    {
        "id": 4,
        "title":"Reset Password",
        "icon":<MdDashboard />,
        "path":'/vendor-password'

    },
    {
        "id": 5,
        "title":"Create Vendor",
        "icon":<MdDashboard />,
        "path":'/create-vendor'

    }
]