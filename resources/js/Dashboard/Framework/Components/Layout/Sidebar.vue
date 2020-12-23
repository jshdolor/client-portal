

<script>
import BaseSidebar from "~/Framework/Components/Layout/Sidebar";
import {userMenu,appMenu} from '@dashboard/Application/Config';

export default {
    extends: BaseSidebar,
    data()  {
        return {
            userMenu,
            appMenu,
        };
    }
}
</script>
