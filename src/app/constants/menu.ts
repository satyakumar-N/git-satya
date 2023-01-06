import { environment } from 'src/environments/environment';

const adminRoot = environment.adminRoot;

export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
  roles?: any;

}
const Roles_list = { Admin: 'Admin', Inspector: 'Inspector', Qc: 'Qc', Jobs: 'Jobs',Qc_Inspector:'Qc_Insp'  }
const data: IMenuItem[] = [
  // -------------------Admin--------------------
  {
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `/dashboard`,
    roles: [Roles_list.Admin],
  },

  {
    icon: 'iconsminds-digital-drawing',
    label: 'menulist.Usermanagement',
    to: `/myprofile`,
    roles: [Roles_list.Admin],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menulist.Manage Roles',
        to: `/manageroles`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menulist.Manage User',
        to: `/manageuser`,
        // roles: [UserRole.Admin],
      },
    ],
  },

  // ---------------------------Jobs-------------------------------------
  {
    icon: 'iconsminds-shop-4',
    label: 'menulist.jobcreation',
    to: `/jobcreation`,
    roles: [Roles_list.Jobs],
  },
   // ---------------------------qc-------------------------------------

  {
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `/qcdashboard`,
    roles: [Roles_list.Qc],
  },

  {
    icon: 'iconsminds-shop-4',
    label: 'menulist.qcvehicleinfo',
    to: `/qcvehicleinfo`,
    roles: [],
  },

  // ---------------------------insp-------------------------------------

  {
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `/inspection`,
    roles: [Roles_list.Inspector],
  },

  {
    icon: 'iconsminds-shop-4',
    label: 'menulist.inspectioninfo',
    to: `/inspectioninfo`,
    roles: [],
  },
  {
    icon: 'iconsminds-shop-4',
    label: 'menulist.inspectionreport',
    to: `/inspectionreport`,
    roles: [],
  },

   // ---------------------------Qc&insp-------------------------------------

   {
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `/QcInspDashboard`,
    roles: [Roles_list.Qc_Inspector],
  },



];
export default data;
