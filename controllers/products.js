const Product = require("../models/product");

const getAllProducts = async(req, res) => {

    
    const {company, name, featured, sort, select} = req.query;
    const queryObject = {};

    //filter
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex : name, $options: "i"};
    }
    if (featured) {
        queryObject.featured = featured;
    }

    //sorting 
    let apiData = Product.find(queryObject);

    if (sort) {
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }

    // select = name company; 
    if (select) {
        // let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    // pagination
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page-1) * limit; //formula

    apiData = apiData.skip(skip).limit(limit);

    console.log(queryObject); // print query

    const Products = await apiData;
    res.status(200).json({Products, dataLength: Products.length });
};

// For Testing purpose
const getAllProductsTesting = async(req, res) => {

    // console.log(req.query);
    const ProductsTesting = await Product.find(req.query);
    res.status(200).json({ProductsTesting});
    
};

module.exports = {getAllProducts, getAllProductsTesting};

