import { selector } from "recoil";
import { courseState } from "../atoms/course";

export const courseDetails = selector({
    key: 'courseDetails', 
    get: ({get}) => {
      const state = get(courseState);
  
      return state.course;
    },
});

export const isCourseLoading = selector({
    key: 'isCourseLoading', 
    get: ({get}) => {
      const state = get(courseState);
  
      return state.isLoading;
    },
});

export const courseTitle = selector({
    key: 'courseTitle', 
    get: ({get}) => {
      const state = get(courseState);
      if(state.course) {
        return state.course.title;
      }
      return "";
    },
});

export const coursePrice = selector({
    key: 'coursePrice', 
    get: ({get}) => {
      const state = get(courseState);
      if(state.course) {
        return state.course.price;
      }
      return "";
    },
});

export const courseImageLink = selector({
    key: 'courseImageLink', 
    get: ({get}) => {
      const state = get(courseState);
      if(state.course) {
        return state.course.imageLink;
      }
      return "";
    },
});

export const courseId = selector({
    key: 'courseId', 
    get: ({get}) => {
      const state = get(courseState);
      if(state.course) {
        return state.course._id;
      }
      return "";
    },
});
