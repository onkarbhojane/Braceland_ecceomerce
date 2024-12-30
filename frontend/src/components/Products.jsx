import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Products.module.css';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fallbackDescriptions = [
    "This is a top-notch product for daily use.",
    "A perfect choice for your unique needs.",
    "Crafted with precision and high-quality materials.",
    "Highly recommended by experts in the field.",
    "A blend of style and functionality.",
  ];

  const exploreMore = () => {
    navigate('/Explore');
  };

  const save = async () => {
    try {
      const res = await axios.get('http://localhost:3000/FetchProducts');
      console.log(res.data.docs, "pppppppppppppppp");
      if (res.status === 201) {
        setProducts([...products, ...res.data.docs]);
      }
    } catch (error) {
      console.log("error in setting products", error);
    }
  };

  useEffect(() => {
    save();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className={styles.products} id="products">
      <h2>Our Collection</h2>
      <div className={styles.scroller}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img
              style={{ height: '244px', width: '244px' }}
              src={product.img}
              alt={product.Name}
            />
            <h3>{product.Name}</h3>
            <p>{product.price}</p>
            <button style={{height:'40px',width:'100px',backgroundColor:'white',fontSize:'15px',borderRadius:'5px'}} onClick={() => openModal(product)}>Quick View</button>
          </div>
        ))}
      </div>
      <div className={styles.exploreMoreContainer}>
        <button className={styles.exploreMoreButton} onClick={exploreMore}>
          Explore More
        </button>
      </div>

      {/* Modal Section */}
      {isModalOpen && selectedProduct && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <img
              style={{ height: '244px', width: '244px' }}
              src={selectedProduct.img}
              alt={selectedProduct.Name}
            />
            <h3>{selectedProduct.FullName}</h3>
            <p>Price: {selectedProduct.price}</p>
            <p>
              Description:{" "}
              {selectedProduct.description ||
                fallbackDescriptions[
                  Math.floor(Math.random() * fallbackDescriptions.length)
                ]}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;


  // const products = [
  //     { 
  //         id: 1, 
  //         Name: 'Golden Bracelet', 
  //         price: '$49', 
  //         img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQrXto-xnzAxsD-Hh_MohKfN7CNH78V6tvcb90SvFP3p7ZfMqzjZKEIh5Wt2IJAncN5IX13iY-pEt84gNOL_s9bkfU85fK-oZSRiueIBxqWqN5ywIRBX56JGog',
  //         FullName: 'Golden Bracelet - Premium handcrafted jewelry for all occasions' 
  //     },
  //     { 
  //         id: 2, 
  //         Name: 'Silver Charm', 
  //         price: '$39', 
  //         img: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTdofQwmzo_lgcafRI-uSqitnaz0gLQqrORgOR8MRyUiwbsSqci0G9g5lGhyspySYiqXkz9CITR-V47aqzy6CHlIrZ2PDyOwpzFubMdmUBNHco_7KyWxbHWDA',
  //         FullName: 'Silver Charm - Elegant and versatile charm bracelet for everyday wear'
  //     },
  //     { 
  //         id: 3, 
  //         Name: 'Pearl Beauty', 
  //         price: '$59', 
  //         img: 'https://m.media-amazon.com/images/I/61O5F0e9VvL._AC_UL480_FMwebp_QL65_.jpg',
  //         FullName: 'Pearl Beauty - Exquisite freshwater pearl bracelet with timeless elegance'
  //     },
  //     { 
  //         id: 4, 
  //         Name: 'D.D Pearls', 
  //         FullName: 'D.D Pearls Original Freshwater Brown Pearl Stretchable Bracelet for Girls & Women - A Nice Gift with Brand Certificate of Pearls', 
  //         price: '₹799', 
  //         img: 'https://m.media-amazon.com/images/I/71wuI0p42uL._AC_UL480_FMwebp_QL65_.jpg' 
  //     },  
  //   { id: 5, Name: 'GIVA',FullName:'925 Silver Pearl Glance Rose Gold Bracelet Charm | Gifts for Women', price: '₹1055', img: 'https://m.media-amazon.com/images/I/41fzIy2OOLL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 6, Name: 'Pearlz Gallery',FullName:'7.5-Inch White Freshwater Pearl Bracelet with Toggle Clasp – Elegant Nugget-Shaped Pearl Jewelry for Women', price: '₹499', img: 'https://m.media-amazon.com/images/I/61OfRGuCkvL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 7, Name: 'MANBHAR GEMS',FullName:'Natural Freshwater Pearls Beads Bracelet for Reiki Healing', price: '₹399', img: 'https://m.media-amazon.com/images/I/31I8eTE+MVL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 8, Name: 'SJ SHUBHAM JEWELLERS™ ',FullName:'Handmade 925 Sterling Silver Cultured Freshwater White Pink', price: '₹1199', img: 'https://m.media-amazon.com/images/I/61By7KMS3SL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 9, Name: 'NEMICHAND JEWELS ',FullName:'Pure 925 Sterling Silver Adjustable Pearl Bracelet for Women and Girls', price: '₹758', img: 'https://m.media-amazon.com/images/I/61EHJbbX8cL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 10, Name: 'Sri Jagdamba Pearls Dealer',FullName:'3 String Original Pearl Bracelet for Women and Girls', price: '₹3088', img: 'https://m.media-amazon.com/images/I/51MltRoDBdL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 11, Name: 'Divine Spirituals',FullName:'Natural Crystal Mother of Pearl (Matrika) Nacre Bracelet 8mm', price: '₹1298', img: 'https://m.media-amazon.com/images/I/61TuV0W4IdL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 12, Name: 'Sri Jagdamba Pearls Dealer',FullName:'Classy Pearl Bracelet For Girls & Women | White Round Freshwater', price: '₹1750', img: 'https://m.media-amazon.com/images/I/51ewocPRJBL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 13, Name: 'JEWEL FUEL',FullName:'White Pearl Bracelet for Women', price: '₹499', img: 'https://m.media-amazon.com/images/I/51wrLKePjsL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 14, Name: 'Karatcart',FullName:'Glossy Finish Tumble Stone Studded Beaded Bracelet', price: '₹455', img: 'https://m.media-amazon.com/images/I/61qPP4vB+oL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 15, Name: 'Pearlz Ocean',FullName:'Dyed Bluish Black Fresh Water Pearl 7.5 Inches Bracelet', price: '₹599', img: 'https://m.media-amazon.com/images/I/61EXhyvzYmL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 16, Name: 'numeroastro',FullName:'Natural & Original Pearl | Moti Round Beads Bracelet For Men ', price: '₹991', img: 'https://m.media-amazon.com/images/I/413DhQ2jFUL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 17, Name: 'Yellow Chimes',FullName:'Pearl Bracelet For Woman | Fashion Golden Bracelet For ', price: '₹276', img: 'https://m.media-amazon.com/images/I/510HwUTfReL._AC_UL480_FMwebp_QL65_.jpg' },
  //   { id: 18, Name: 'INSELLBERG',FullName:'2Pcs Pearl Bracelets for Women Pearl Beaded Bracelets Pearl', price: '₹175', img: 'https://m.media-amazon.com/images/I/71qP6GWhWbL._AC_UL480_FMwebp_QL65_.jpg'},
  //   { id: 19, Name: 'IRIS GEMS',FullName:'White Pearl Bracelet Pearl Bracelet Original Certified Real Mukta', price: '₹2299', img: 'https://m.media-amazon.com/images/I/31A+V683vFL._AC_UL480_FMwebp_QL65_.jpg'},
  //   { id: 20, Name: 'ZAVYA',FullName:"925 Sterling Silver Freshwater Pearl Rhodium Plated Women's'", price: '₹1499', img: "https://m.media-amazon.com/images/I/61Rc51J7x8L._AC_UL480_FMwebp_QL65_.jpg"},
  //   { id: 21, Name: 'Reiki Crystal Products',FullName:'Natural Pearl Adjustable Bracelet for Reiki Healing and Crystal', price: '₹1199', img: "https://m.media-amazon.com/images/I/61dmhvetCpL._AC_UL480_FMwebp_QL65_.jpg"},
  //   { id: 22, Name: 'Sri Jagdamba Pearls Dealer',FullName:'Black Dive Pearl Bracelet for Women and Girls', price: '₹2000', img: "https://m.media-amazon.com/images/I/51j33bTdOsL._AC_UL480_FMwebp_QL65_.jpg"},
  //   { id: 23, Name: 'Purabi',FullName:'Jewels Designer Gold Plated Original Gold Like Fish Design', price: '₹729', img: "https://m.media-amazon.com/images/I/61OL2Rnq2OL._AC_UL480_FMwebp_QL65_.jpg"},
  //   { id: 24, Name: 'Young & Forever',FullName:'Evil Eye Original Black Tourmaline Nazariya Green Aventurine Pyrite', price: '₹379', img: "https://m.media-amazon.com/images/I/51kNlLYj9fL._AC_UL480_FMwebp_QL65_.jpg"},
  //   { id: 25, Name: 'GOLDEN QUARTZ - THE CRYSTAL HUB',FullName:'Clear Quartz Crystal Bracelet for Healing, Meditation & Chakr', price: '₹686', img: "https://m.media-amazon.com/images/I/41fxTuKD6lL._AC_UL480_FMwebp_QL65_.jpg"},
  //   { id: 26, Name: 'GIVA',FullName:'925 Silver Rose Gold Starlit Dreams Bracelet, Adjustable| Gifts', price: '₹1601', img: "https://m.media-amazon.com/images/I/51ZqMIUyx9L._AC_UL480_FMwebp_QL65_.jpg"},
  //   { id: 27, Name: 'ZAVYA',FullName:"925 Sterling Silver Freshwater Pearl Rhodium Plated Women's", price: '₹1499', img: "https://m.media-amazon.com/images/I/61Rc51J7x8L._AC_UL480_FMwebp_QL65_.jpg"},
  //   { id: 28, Name: 'THE MARKETVILLA',FullName:"Pure 925 Silver Bracelet for Women - Heart Infinity Bracelet f", price: '₹1499', img: "https://m.media-amazon.com/images/I/61s6thrSrJL._AC_UL480_FMwebp_QL65_.jpg"},
  //   { id: 29, Name: 'Love925',FullName:"Silver Infinity Chain Bracelet | Bracelet for Women | With", price: '₹1399', img: "https://m.media-amazon.com/images/I/61rZ37oLSUL._AC_UL480_FMwebp_QL65_.jpg"},
  //   { id: 30, Name: 'Shubhanjali',FullName:"Turkish Evil Eye Bracelet for Woman and Men Jewellery |", price: '₹399', img: "https://m.media-amazon.com/images/I/51TXRicT34L._AC_UL480_FMwebp_QL65_.jpg"},
  // ]
  // const save=async()=>{
  //   try{
  //     const res=await axios.post('http://localhost:3000/products',products)
  //     console.log("saved ",res.status);
  //   }catch(error){
  //     console.log("error in setting products",error)
  //   }
  // }