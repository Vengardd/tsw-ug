import axios from "axios";

const url = "http://localhost:5000/api/auction";

class AuctionService {
    // Get Posts
    static async getAllAuctions () {
        console.log("asd");
        console.log(url + "/all");
        const response = await axios.get(url + "/all");
        return response.data.map(auction => ({
            id: auction._id,
            title: auction.title
        }));
    }

    // // Create Post
    // static insertPost (text) {
    //     return axios.post(url, {
    //         text
    //     });
    // }

    // // Delete Post
    // static deletePost (id) {
    //     return axios.delete(`${url}${id}`);
    // }
}

export default AuctionService;
