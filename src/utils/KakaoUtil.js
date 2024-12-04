class KakaoUtil {
    constructor() {
        if (!KakaoUtil.instance) {
            KakaoUtil.instance = this;
        }
        this.REST_API_KEY = '0b0821fbb5471ffa343edde8124b5ed1';
        this.apiUrl = 'https://dapi.kakao.com/v2/local/search/category';
        this.category = 'FD6';
        this.headers = {
            'Authorization': `KakaoAK ${this.REST_API_KEY}`,
        }

        return KakaoUtil.instance;
    }

    setParams(x, y, radius, page) {
        this.params = {
            x,
            y,
            radius,
            page,
            category_group_code: this.category,
        };

        this.queryString = new URLSearchParams(this.params).toString();
    }

    async getPlace(x, y, radius=500, page=1) {
        if (!x || !y || !radius) {
            alert('x, y, radius를 설정하세요');
            return;
        }

        console.log(radius, page);

        this.setParams(x, y, radius, page);

        let reqUrl = `${this.apiUrl}?${this.queryString}`;

        const result = await fetch(reqUrl, {
            method: 'get',
            headers: this.headers,
        });
        return await result.json();
    }

    // async getPlace(place, page) {
    //     if (!place) {
    //         alert('x, y, radius를 설정하세요');
    //         return;
    //     }

    //     this.setParams(place.x, place.y, place.radius);

    //     let reqUrl = `${this.apiUrl}?${this.queryString}`;

    //     if (page) {
    //         reqUrl += `&page=${page}`;
    //     }

    //     const result = await fetch(reqUrl, {
    //         method: 'get',
    //         headers: this.headers,
    //     });
    //     return await result.json();
    // }

    async getCoords(placeName) {
        const apiUrl = 'https://dapi.kakao.com/v2/local/search/address';
        const reqUrl = `${apiUrl}?query=${placeName}`;

        const result = await fetch(reqUrl, {
            method: 'get',
            headers: this.headers,
        });

        return await result.json();
    }
}

const kakaoUtil = new KakaoUtil();
export default kakaoUtil;