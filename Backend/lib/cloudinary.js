import { v2 as cloudinary } from 'cloudinary';



    // Configuration
    cloudinary.config({ 
        cloud_name: 'di6hepqok', 
        api_key: '613167364751776', 
        api__secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });


    export default cloudinary;