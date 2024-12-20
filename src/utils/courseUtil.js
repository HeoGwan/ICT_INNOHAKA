import kakaoUtil from "./KakaoUtil";

class CourseUtil {
    #courses = {};

    constructor() {
        if (!CourseUtil.instance) {
            CourseUtil.instance = this;
        }

        this.#courses = {
            'red_line': this.getCsvData('red_line'),
            'green_line': this.getCsvData('green_line'),
            'orange_line': this.getCsvData('orange_line'),
        };

        return CourseUtil.instance;
    }

    async getCsvData(fileName) {
        const result = await fetch(`./csv/${fileName}.csv`);
        const data = await result.text();
        return data.split('\r\n').map(d => d.split(','));
    }

    async getCourse(courseName) {
        return this.#courses[courseName];
    }
}

const courseUtil = new CourseUtil();
export default courseUtil;