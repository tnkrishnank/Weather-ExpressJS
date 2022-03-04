const w_data = require('./w_data');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.listen(3000);

app.set('view engine', 'ejs');
app.set('views', 'templates');
app.use(express.static(__dirname + '/static/'));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    const address = req.query.city;
    try {
        if(!address) {
            return res.render('index', {
                error: "",
                last_updated: "",
                temp_c: "",
                temp_f: "",
                c_name: "",
                region: "",
                country: ""
            });
        }
        
        w_data(address, (error, {last_updated, temp_c, temp_f, c_name, region, country} = {}) => {
            if(error) {
                return res.render('index', {
                    error: "DATA UNAVAILABLE !!!",
                    last_updated: "",
                    temp_c: "",
                    temp_f: "",
                    c_name: "",
                    region: "",
                    country: ""
                });
            }
            res.render('index', {
                error: "false",
                last_updated: last_updated,
                temp_c: temp_c,
                temp_f: temp_f,
                c_name: c_name,
                region: region,
                country: country
            });
        });
    }
    catch (error) {
        return res.render('index', {
            error: "INTERNAL SERVER ERROR !",
            last_updated: "",
            temp_c: "",
            temp_f: "",
            c_name: "",
            region: "",
            country: ""
        });
    }
});

app.use((req, res) => {
    res.status(400).render('404');
});