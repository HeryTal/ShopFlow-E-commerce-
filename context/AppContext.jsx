'use client'
import { productsDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const { user } = useUser();
    const { getToken } = useAuth();

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})

    const fetchProductData = async () => {
        try {
            const {data} = await axios.get("/api/product/list");
            if (data.success) {
                setProducts(data.products);
            } else {
                console.error("Erreur recuperation produits:", data.message);
                setProducts(productsDummyData);
            }
        }
        catch (error) {
            console.error("Erreur lors de la récupération des produits:", error);
            setProducts(productsDummyData);
        }
    }

    const fetchUserData = async () => {
        try {
            const sellerFromClerk = Boolean(user?.id);
            setIsSeller(sellerFromClerk);

            const token = await getToken();
            const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
            const { data } = await axios.get('/api/user/data', { headers })

            if (data.success) {
                setUserData(data.user);
                setCartItems(data.user.cartItems || {});
                setIsSeller(true);
            } else {
                console.error("Erreur recuperation donnees utilisateur:", data.message);
                setUserData(null);
                setIsSeller(sellerFromClerk);
            }
        } catch (error) {
            console.error("Erreur recuperation donnees utilisateur:", error.message);
            setUserData(null);
            setIsSeller(Boolean(user?.id));
        }
    }

    const promoteToSeller = async () => {
        const token = await getToken();
        const headers = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        const { data } = await axios.post("/api/user/role", { role: "seller" }, { headers });
        if (data?.success) {
            setIsSeller(true);
            await fetchUserData();
        }
        return data;
    }

    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        console.log("Produit ajouté au panier");

        if (user){
            try {
                const token = await getToken();
                const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
                const response = await axios.post("/api/cart/update", { cartData }, { headers });
                if (!response.data.success) {
                    console.error("Erreur mise à jour panier");
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour du panier");
            }
        }

    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        }  else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
        if (user){
            try {
                const token = await getToken();
                const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
                const response = await axios.post("/api/cart/update", { cartData }, { headers });
                if (!response.data.success) {
                    console.error("Erreur mise à jour quantité");
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour du panier");
            }
        } 

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        if (user?.id) {
            fetchUserData()
        } else {
            setUserData(false)
            setIsSeller(false)
        }
    }, [user?.id])

    const value = {
        user, getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        promoteToSeller,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
