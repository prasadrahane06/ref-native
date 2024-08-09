/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `` | `/` | `/(home)` | `/(home)/(school)` | `/(home)/(student)` | `/(home)/AddNewCourse/AddCourse` | `/(home)/AddNewCourse/AddPlan` | `/(home)/addNewFacility/AddFacility` | `/(home)/compare/compareSchools` | `/(home)/compare/searchSchool` | `/(home)/course/AllCoursesScreen` | `/(home)/events/AddNewEvent` | `/(home)/list/AllSchoolsList` | `/(home)/notification/notification` | `/(home)/ratingsAndReview/AUIRatingsAndReview` | `/(home)/school/AllSchoolsScreen` | `/(school)` | `/(student)` | `/AddNewCourse/AddCourse` | `/AddNewCourse/AddPlan` | `/_sitemap` | `/addNewFacility/AddFacility` | `/cart` | `/changeNumberEmail` | `/compare` | `/compare/compareSchools` | `/compare/searchSchool` | `/course/AllCoursesScreen` | `/courses` | `/details` | `/events/AddNewEvent` | `/facilities` | `/favourite` | `/help` | `/list/AllSchoolsList` | `/login` | `/notification/notification` | `/payment` | `/profile` | `/ratingsAndReview/AUIRatingsAndReview` | `/school/AllSchoolsScreen` | `/schoolProfile` | `/schooldetails` | `/services/axiosClient` | `/services/botAxiosClient` | `/services/data.json` | `/signup` | `/studentTab` | `/transactions`;
      DynamicRoutes: `/(home)/cityDetails/${Router.SingleRoutePart<T>}` | `/(home)/courseDetails/${Router.SingleRoutePart<T>}` | `/(home)/courseDetails/purchase/${Router.SingleRoutePart<T>}` | `/(home)/schoolDetails/${Router.SingleRoutePart<T>}` | `/(home)/studentInfo/${Router.SingleRoutePart<T>}` | `/cityDetails/${Router.SingleRoutePart<T>}` | `/courseDetails/${Router.SingleRoutePart<T>}` | `/courseDetails/purchase/${Router.SingleRoutePart<T>}` | `/schoolDetails/${Router.SingleRoutePart<T>}` | `/studentInfo/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(home)/cityDetails/[id]` | `/(home)/courseDetails/[id]` | `/(home)/courseDetails/purchase/[id]` | `/(home)/schoolDetails/[id]` | `/(home)/studentInfo/[id]` | `/cityDetails/[id]` | `/courseDetails/[id]` | `/courseDetails/purchase/[id]` | `/schoolDetails/[id]` | `/studentInfo/[id]`;
    }
  }
}
