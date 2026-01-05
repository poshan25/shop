
// // // import { useEffect, useState } from "react";
// // // import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
// // // import { supabase } from "./supabaseClient";
// // // import "./index.css";

// // // const ADMIN_PIN = "12345";
// // // const NO_IMAGE = "https://placehold.co/300x200?text=No+Image";

// // // const NAV_LINKS = [
// // //   { path: "/", label: "User View" },
// // //   { path: "/admin", label: "Admin Panel" },
// // // ];

// // // function getMainImage(product) {
// // //   const main = product.main_image_url;
// // //   const firstSizeWithImage = product.product_sizes?.find((s) => s.image_url)?.image_url;
// // //   return main || firstSizeWithImage || NO_IMAGE;
// // // }

// // // export default function App() {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const [pin, setPin] = useState("");
// // //   const [isAdmin, setIsAdmin] = useState(false);
// // //   const [products, setProducts] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   // Form state
// // //   const [productName, setProductName] = useState("");
// // //   const [productBlock, setProductBlock] = useState("");
// // //   const [mainImageUrl, setMainImageUrl] = useState("");
// // //   const [uploadingMain, setUploadingMain] = useState(false);
// // //   const [sizes, setSizes] = useState([
// // //     { label: "", litres: "", price: "", image_url: "", uploading: false },
// // //   ]);

// // //   // Editing state
// // //   const [editingProductId, setEditingProductId] = useState(null);

// // //   useEffect(() => {
// // //     loadProducts();
// // //   }, []);

// // //   useEffect(() => {
// // //     const delay = setTimeout(() => loadProducts(search), 300);
// // //     return () => clearTimeout(delay);
// // //   }, [search]);

// // //   // Upload helper
// // //   async function uploadImage(file) {
// // //     const ext = file.name.split(".").pop();
// // //     const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
// // //     const { error } = await supabase.storage
// // //       .from("product-images")
// // //       .upload(path, file, { upsert: true });
// // //     if (error) throw error;
// // //     const { data } = supabase.storage.from("product-images").getPublicUrl(path);
// // //     return data.publicUrl;
// // //   }

// // //   // Fetch products + sizes
// // //   async function loadProducts(term = "") {
// // //     setLoading(true);
// // //     const query = supabase
// // //       .from("products")
// // //       .select(
// // //         "id, name, block, main_image_url, product_sizes(id, label, litres, price, image_url)"
// // //       )
// // //       .order("name", { ascending: true });
// // //     if (term) query.ilike("name", `%${term}%`);
// // //     const { data, error } = await query;
// // //     if (!error && data) setProducts(data);
// // //     setLoading(false);
// // //   }

// // //   function handleLogin() {
// // //     if (pin === ADMIN_PIN) {
// // //       setIsAdmin(true);
// // //       setPin("");
// // //       navigate("/admin");
// // //     } else {
// // //       alert("Wrong PIN");
// // //     }
// // //   }

// // //   function addSizeRow() {
// // //     setSizes([
// // //       ...sizes,
// // //       { label: "", litres: "", price: "", image_url: "", uploading: false },
// // //     ]);
// // //   }

// // //   function updateSizeRow(idx, key, value) {
// // //     const copy = [...sizes];
// // //     copy[idx][key] = value;
// // //     setSizes(copy);
// // //   }

// // //   function removeSizeRow(idx) {
// // //     if (sizes.length === 1) return;
// // //     setSizes(sizes.filter((_, i) => i !== idx));
// // //   }

// // //   async function handleAddOrUpdateProduct() {
// // //     if (!productName) {
// // //       alert("Please add product name");
// // //       return;
// // //     }

// // //     if (!editingProductId) {
// // //       // CREATE
// // //       const { data: product, error: pErr } = await supabase
// // //         .from("products")
// // //         .insert([
// // //           { name: productName, block: productBlock, main_image_url: mainImageUrl || null },
// // //         ])
// // //         .select()
// // //         .single();

// // //       if (pErr || !product) {
// // //         alert("Error adding product");
// // //         return;
// // //       }

// // //       // sizes
// // //       const payload = sizes
// // //         .filter((s) => s.label && s.price !== "")
// // //         .map((s) => ({
// // //           product_id: product.id,
// // //           label: s.label,
// // //           litres: s.litres,
// // //           price: Number(s.price),
// // //           image_url: s.image_url || null,
// // //         }));
// // //       if (payload.length) {
// // //         const { error: sErr } = await supabase.from("product_sizes").insert(payload);
// // //         if (sErr) alert("Error adding sizes");
// // //       }
// // //     } else {
// // //       // UPDATE product + sizes
// // //       const pid = editingProductId;

// // //       await supabase
// // //         .from("products")
// // //         .update({
// // //           name: productName,
// // //           block: productBlock,
// // //           main_image_url: mainImageUrl || null,
// // //         })
// // //         .eq("id", pid);

// // //       // Replace sizes: delete then insert new
// // //       await supabase.from("product_sizes").delete().eq("product_id", pid);
// // //       const payload = sizes
// // //         .filter((s) => s.label && s.price !== "")
// // //         .map((s) => ({
// // //           product_id: pid,
// // //           label: s.label,
// // //           litres: s.litres,
// // //           price: Number(s.price),
// // //           image_url: s.image_url || null,
// // //         }));
// // //       if (payload.length) {
// // //         await supabase.from("product_sizes").insert(payload);
// // //       }
// // //     }

// // //     // reset form
// // //     setProductName("");
// // //     setProductBlock("");
// // //     setMainImageUrl("");
// // //     setSizes([{ label: "", litres: "", price: "", image_url: "", uploading: false }]);
// // //     setEditingProductId(null);

// // //     loadProducts(search);
// // //   }

// // //   async function handleDeleteProduct(id) {
// // //     if (!confirm("Delete product and its sizes?")) return;
// // //     await supabase.from("products").delete().eq("id", id);
// // //     loadProducts(search);
// // //   }

// // //   async function handleMainFileChange(e) {
// // //     const file = e.target.files?.[0];
// // //     if (!file) return;
// // //     try {
// // //       setUploadingMain(true);
// // //       const url = await uploadImage(file);
// // //       setMainImageUrl(url);
// // //     } catch (err) {
// // //       alert("Upload failed");
// // //       console.error(err);
// // //     } finally {
// // //       setUploadingMain(false);
// // //     }
// // //   }

// // //   async function handleSizeFileChange(idx, e) {
// // //     const file = e.target.files?.[0];
// // //     if (!file) return;
// // //     const copy = [...sizes];
// // //     copy[idx].uploading = true;
// // //     setSizes(copy);
// // //     try {
// // //       const url = await uploadImage(file);
// // //       copy[idx].image_url = url;
// // //     } catch (err) {
// // //       alert("Upload failed");
// // //       console.error(err);
// // //     } finally {
// // //       copy[idx].uploading = false;
// // //       setSizes([...copy]);
// // //     }
// // //   }

// // //   const handleEditFromList = (product) => {
// // //     // Prefill form and go to admin
// // //     setEditingProductId(product.id);
// // //     setProductName(product.name);
// // //     setProductBlock(product.block || "");
// // //     setMainImageUrl(product.main_image_url || "");
// // //     setSizes(
// // //       product.product_sizes?.length
// // //         ? product.product_sizes.map((s) => ({
// // //             label: s.label || "",
// // //             litres: s.litres || "",
// // //             price: s.price ?? "",
// // //             image_url: s.image_url || "",
// // //             uploading: false,
// // //           }))
// // //         : [{ label: "", litres: "", price: "", image_url: "", uploading: false }]
// // //     );
// // //     navigate("/admin");
// // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // //   };

// // //   const userPanel = (
// // //     <UserPanel
// // //       products={products}
// // //       loading={loading}
// // //       search={search}
// // //       onSearchChange={(e) => setSearch(e.target.value)}
// // //       isAdmin={isAdmin}
// // //       onDelete={handleDeleteProduct}
// // //       onEdit={handleEditFromList}
// // //     />
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
// // //       <div className="max-w-5xl mx-auto p-4 space-y-8">
// // //         <header className="flex flex-col md:flex-row md:items-end justify-between border-b pb-4 gap-4">
// // //           <div>
// // //             <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Drinks Shop</h1>
// // //             <p className="text-slate-500 mt-1">Premium selection catalog</p>
// // //           </div>
// // //           <nav className="flex items-center gap-2">
// // //             {NAV_LINKS.map((link) => {
// // //               const isActive =
// // //                 link.path === "/"
// // //                   ? location.pathname === "/"
// // //                   : location.pathname.startsWith(link.path);
// // //               return (
// // //                 <Link
// // //                   key={link.path}
// // //                   to={link.path}
// // //                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
// // //                     isActive
// // //                       ? "bg-slate-900 text-white shadow-md"
// // //                       : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:bg-slate-50"
// // //                   }`}
// // //                 >
// // //                   {link.label}
// // //                 </Link>
// // //               );
// // //             })}
// // //           </nav>
// // //         </header>

// // //         <Routes>
// // //           <Route
// // //             path="/admin"
// // //             element={
// // //               <div className="space-y-8 animate-fade-in">
// // //                 {/* Login Section */}
// // //                 {!isAdmin && (
// // //                   <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-md mx-auto border border-slate-100">
// // //                     <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
// // //                     <p className="text-sm text-slate-500 mb-6">Enter PIN (12345) to manage inventory.</p>
// // //                     <div className="flex gap-2">
// // //                       <input
// // //                         type="password"
// // //                         className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
// // //                         placeholder="PIN Code"
// // //                         value={pin}
// // //                         onChange={(e) => setPin(e.target.value)}
// // //                       />
// // //                       <button
// // //                         onClick={handleLogin}
// // //                         className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition shadow-lg"
// // //                       >
// // //                         Login
// // //                       </button>
// // //                     </div>
// // //                   </section>
// // //                 )}

// // //                 {/* Product Form */}
// // //                 {isAdmin && (
// // //                   <section className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100">
// // //                     <div className="flex items-center justify-between mb-6 border-b pb-4">
// // //                       <h2 className="text-2xl font-bold text-slate-800">
// // //                         {editingProductId ? "Edit Product" : "Add New Product"}
// // //                       </h2>
// // //                       <div className="flex gap-2">
// // //                         {editingProductId && (
// // //                           <button 
// // //                             onClick={() => {
// // //                               setEditingProductId(null);
// // //                               setProductName("");
// // //                               setProductBlock("");
// // //                               setMainImageUrl("");
// // //                               setSizes([{ label: "", litres: "", price: "", image_url: "", uploading: false }]);
// // //                             }}
// // //                             className="text-sm px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
// // //                           >
// // //                             Cancel
// // //                           </button>
// // //                         )}
// // //                         <button
// // //                           onClick={addSizeRow}
// // //                           className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-100 transition border border-emerald-200"
// // //                         >
// // //                           + Add Variant
// // //                         </button>
// // //                       </div>
// // //                     </div>

// // //                     <div className="grid gap-6 md:grid-cols-2 mb-8">
// // //                       <div className="space-y-2">
// // //                         <label className="text-sm font-semibold text-slate-700">Product Name</label>
// // //                         <input
// // //                           className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
// // //                           value={productName}
// // //                           onChange={(e) => setProductName(e.target.value)}
// // //                           placeholder="e.g. Black Label"
// // //                         />
// // //                       </div>
// // //                       <div className="space-y-2">
// // //                         <label className="text-sm font-semibold text-slate-700">Block Location</label>
// // //                         <input
// // //                           className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
// // //                           value={productBlock}
// // //                           onChange={(e) => setProductBlock(e.target.value)}
// // //                           placeholder="e.g. 12"
// // //                         />
// // //                       </div>
// // //                       <div className="md:col-span-2 space-y-2">
// // //                         <label className="text-sm font-semibold text-slate-700">Main Image</label>
// // //                         <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-50 transition">
// // //                           <input type="file" accept="image/*" onChange={handleMainFileChange} className="text-sm text-slate-600" />
// // //                           {uploadingMain && <span className="text-sm text-blue-600 font-medium">Uploading...</span>}
// // //                           {mainImageUrl && (
// // //                             <img src={mainImageUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg shadow-sm" />
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     <div className="space-y-4 mb-8">
// // //                       <h3 className="text-lg font-bold text-slate-700">Size Variants</h3>
// // //                       {sizes.map((s, idx) => (
// // //                         <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid gap-4 md:grid-cols-12 items-center">
// // //                           <div className="md:col-span-3">
// // //                             <input
// // //                               className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
// // //                               placeholder="Label (e.g. Bottle)"
// // //                               value={s.label}
// // //                               onChange={(e) => updateSizeRow(idx, "label", e.target.value)}
// // //                             />
// // //                           </div>
// // //                           <div className="md:col-span-2">
// // //                             <input
// // //                               className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
// // //                               placeholder="Vol (e.g. 750ml)"
// // //                               value={s.litres}
// // //                               onChange={(e) => updateSizeRow(idx, "litres", e.target.value)}
// // //                             />
// // //                           </div>
// // //                           <div className="md:col-span-2">
// // //                             <input
// // //                               className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
// // //                               type="number"
// // //                               placeholder="Price"
// // //                               value={s.price}
// // //                               onChange={(e) => updateSizeRow(idx, "price", e.target.value)}
// // //                             />
// // //                           </div>
// // //                           <div className="md:col-span-4 flex items-center gap-2">
// // //                              <input type="file" className="text-xs w-full" accept="image/*" onChange={(e) => handleSizeFileChange(idx, e)} />
// // //                              {s.image_url && <img src={s.image_url} className="w-10 h-10 rounded border object-cover" />}
// // //                           </div>
// // //                           <div className="md:col-span-1 text-right">
// // //                             <button
// // //                               onClick={() => removeSizeRow(idx)}
// // //                               className="text-red-500 hover:text-red-700"
// // //                               disabled={sizes.length === 1}
// // //                             >
// // //                               ✕
// // //                             </button>
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                     </div>

// // //                     <button
// // //                       onClick={handleAddOrUpdateProduct}
// // //                       className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-xl"
// // //                     >
// // //                       {editingProductId ? "Update Product" : "Save Product"}
// // //                     </button>
// // //                   </section>
// // //                 )}
// // //               </div>
// // //             }
// // //           />
// // //           <Route path="/" element={userPanel} />
// // //           <Route path="*" element={userPanel} />
// // //         </Routes>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ----- User Panel (Modified as requested) -----
// // // function UserPanel({
// // //   products,
// // //   loading,
// // //   search,
// // //   onSearchChange,
// // //   isAdmin,
// // //   onDelete,
// // //   onEdit,
// // // }) {
// // //   // State to track which single product is currently expanded
// // //   const [expandedId, setExpandedId] = useState(null);

// // //   const toggleProduct = (id) => {
// // //     // If clicking the same product, close it. If clicking different, open that one (closes others).
// // //     setExpandedId((prev) => (prev === id ? null : id));
// // //   };

// // //   return (
// // //     <section className="space-y-6">
// // //       {/* Search Bar */}
// // //       <div className="relative">
// // //         <input
// // //           className="w-full bg-white border-0 shadow-sm rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-slate-900 outline-none"
// // //           placeholder="Search products..."
// // //           value={search}
// // //           onChange={onSearchChange}
// // //         />
// // //         <svg className="absolute right-6 top-5 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
// // //       </div>

// // //       {loading && (
// // //         <div className="flex justify-center py-10">
// // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
// // //         </div>
// // //       )}

// // //       <div className="space-y-4">
// // //         {products.map((p) => {
// // //           const mainImg = getMainImage(p);
// // //           const isExpanded = expandedId === p.id;
          
// // //           return (
// // //             <div 
// // //               key={p.id} 
// // //               className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-slate-900 shadow-lg' : 'hover:shadow-md'}`}
// // //             >
// // //               {/* Product Header Row (Click to Expand) */}
// // //               <div 
// // //                 onClick={() => toggleProduct(p.id)}
// // //                 className="flex items-center p-4 cursor-pointer select-none"
// // //               >
// // //                 <div className="relative h-20 w-20 flex-shrink-0">
// // //                   <img
// // //                     src={mainImg}
// // //                     alt={p.name}
// // //                     className="w-full h-full object-cover rounded-lg bg-slate-100"
// // //                   />
// // //                 </div>
                
// // //                 <div className="ml-5 flex-1">
// // //                   <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
// // //                   <div className="flex items-center gap-2 mt-1">
// // //                      {!isExpanded && (
// // //                        <span className="text-sm text-slate-500 font-medium">
// // //                          {p.product_sizes?.length || 0} variants available
// // //                        </span>
// // //                      )}
// // //                      {p.block && (
// // //                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
// // //                          Block {p.block}
// // //                        </span>
// // //                      )}
// // //                   </div>
// // //                 </div>

// // //                 <div className="px-4">
// // //                   <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
// // //                     <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// // //                     </svg>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Admin Actions (Only show if admin) */}
// // //               {isAdmin && (
// // //                 <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex gap-4 text-sm">
// // //                    <button onClick={() => onEdit?.(p)} className="text-blue-600 font-medium hover:underline">Edit Product</button>
// // //                    <button onClick={() => onDelete?.(p.id)} className="text-red-600 font-medium hover:underline">Delete Product</button>
// // //                 </div>
// // //               )}

// // //               {/* Expanded Content: List of Sizes */}
// // //               {isExpanded && (
// // //                 <div className="bg-slate-50 border-t border-slate-100 p-6 animate-fade-in">
// // //                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
// // //                     {(p.product_sizes || []).map((s) => (
// // //                       <div 
// // //                         key={s.id} 
// // //                         className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
// // //                       >
// // //                         {/* 1. Image */}
// // //                         <div className="h-32 w-full mb-3 flex items-center justify-center bg-white rounded-lg overflow-hidden">
// // //                           <img 
// // //                             src={s.image_url || mainImg} 
// // //                             alt={s.label} 
// // //                             className="h-full w-full object-contain hover:scale-105 transition-transform duration-300" 
// // //                           />
// // //                         </div>
// // //                          {/* 2. Litre */}
// // //                         <div className="text-sm font-semibold text-slate-700">
// // //                           Volume: {s.litres || "N/A"}
// // //                         </div>
// // //                         {/* 3. Price */}
// // //                         <div className="text-2xl font-black text-slate-900 mb-1">
// // //                           NPR: {s.price}
// // //                         </div>

// // //                         {/* 4. Block */}
// // //                         {/* <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-0.5">
// // //                           Block: {p.block || "N/A"}
// // //                         </div> */}

                       
// // //                       </div>
// // //                     ))}
// // //                     {(!p.product_sizes || p.product_sizes.length === 0) && (
// // //                       <div className="col-span-full text-center py-4 text-slate-500 italic">
// // //                         No sizes available for this product.
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           );
// // //         })}

// // //         {products.length === 0 && !loading && (
// // //           <div className="text-center py-12 text-slate-500">
// // //             No products found matching your search.
// // //           </div>
// // //         )}
// // //       </div>
// // //     </section>
// // //   );
// // // }


// // // with camera newCode


// // import { useEffect, useRef, useState } from "react";
// // import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
// // import { supabase } from "./supabaseClient";
// // import "./index.css";

// // const ADMIN_PIN = "12345";
// // const NO_IMAGE = "https://placehold.co/300x200?text=No+Image";

// // const NAV_LINKS = [
// //   { path: "/", label: "User View" },
// //   { path: "/admin", label: "Admin Panel" },
// // ];

// // function getMainImage(product) {
// //   const main = product.main_image_url;
// //   const firstSizeWithImage = product.product_sizes?.find((s) => s.image_url)?.image_url;
// //   return main || firstSizeWithImage || NO_IMAGE;
// // }

// // export default function App() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [pin, setPin] = useState("");
// //   const [isAdmin, setIsAdmin] = useState(false);
// //   const [products, setProducts] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   // Form state
// //   const [productName, setProductName] = useState("");
// //   const [productBlock, setProductBlock] = useState("");
// //   const [mainImageUrl, setMainImageUrl] = useState("");
// //   const [uploadingMain, setUploadingMain] = useState(false);
// //   const [sizes, setSizes] = useState([
// //     { label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false },
// //   ]);

// //   // Editing state
// //   const [editingProductId, setEditingProductId] = useState(null);

// //   // Refs for camera capture
// //   const mainCameraInputRef = useRef(null);
// //   const sizeCameraInputRefs = useRef({}); // { idx: ref }

// //   useEffect(() => {
// //     loadProducts();
// //   }, []);

// //   useEffect(() => {
// //     const delay = setTimeout(() => loadProducts(search), 300);
// //     return () => clearTimeout(delay);
// //   }, [search]);

// //   // Upload helper
// //   async function uploadImage(file) {
// //     const ext = file.name.split(".").pop();
// //     const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
// //     const { error } = await supabase.storage
// //       .from("product-images")
// //       .upload(path, file, { upsert: true });
// //     if (error) throw error;
// //     const { data } = supabase.storage.from("product-images").getPublicUrl(path);
// //     return data.publicUrl;
// //   }

// //   // Fetch products + sizes
// //   async function loadProducts(term = "") {
// //     setLoading(true);
// //     const query = supabase
// //       .from("products")
// //       .select(
// //         "id, name, block, main_image_url, product_sizes(id, label, litres, price, pasal_price, image_url)"
// //       )
// //       .order("name", { ascending: true });
// //     if (term) query.ilike("name", `%${term}%`);
// //     const { data, error } = await query;
// //     if (!error && data) setProducts(data);
// //     setLoading(false);
// //   }

// //   function handleLogin() {
// //     if (pin === ADMIN_PIN) {
// //       setIsAdmin(true);
// //       setPin("");
// //       navigate("/admin");
// //     } else {
// //       alert("Wrong PIN");
// //     }
// //   }

// //   function addSizeRow() {
// //     setSizes([
// //       ...sizes,
// //       { label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false },
// //     ]);
// //   }

// //   function updateSizeRow(idx, key, value) {
// //     const copy = [...sizes];
// //     copy[idx][key] = value;
// //     setSizes(copy);
// //   }

// //   function removeSizeRow(idx) {
// //     if (sizes.length === 1) return;
// //     setSizes(sizes.filter((_, i) => i !== idx));
// //   }

// //   async function handleAddOrUpdateProduct() {
// //     if (!productName) {
// //       alert("Please add product name");
// //       return;
// //     }

// //     if (!editingProductId) {
// //       // CREATE
// //       const { data: product, error: pErr } = await supabase
// //         .from("products")
// //         .insert([
// //           { name: productName, block: productBlock, main_image_url: mainImageUrl || null },
// //         ])
// //         .select()
// //         .single();

// //       if (pErr || !product) {
// //         alert("Error adding product");
// //         return;
// //       }

// //       // sizes
// //       const payload = sizes
// //         .filter((s) => s.label && s.price !== "")
// //         .map((s) => ({
// //           product_id: product.id,
// //           label: s.label,
// //           litres: s.litres,
// //           price: Number(s.price),
// //           pasal_price: s.pasal_price === "" ? null : Number(s.pasal_price),
// //           image_url: s.image_url || null,
// //         }));
// //       if (payload.length) {
// //         const { error: sErr } = await supabase.from("product_sizes").insert(payload);
// //         if (sErr) alert("Error adding sizes");
// //       }
// //     } else {
// //       // UPDATE product + sizes
// //       const pid = editingProductId;

// //       await supabase
// //         .from("products")
// //         .update({
// //           name: productName,
// //           block: productBlock,
// //           main_image_url: mainImageUrl || null,
// //         })
// //         .eq("id", pid);

// //       // Replace sizes: delete then insert new
// //       await supabase.from("product_sizes").delete().eq("product_id", pid);
// //       const payload = sizes
// //         .filter((s) => s.label && s.price !== "")
// //         .map((s) => ({
// //           product_id: pid,
// //           label: s.label,
// //           litres: s.litres,
// //           price: Number(s.price),
// //           pasal_price: s.pasal_price === "" ? null : Number(s.pasal_price),
// //           image_url: s.image_url || null,
// //         }));
// //       if (payload.length) {
// //         await supabase.from("product_sizes").insert(payload);
// //       }
// //     }

// //     // reset form
// //     setProductName("");
// //     setProductBlock("");
// //     setMainImageUrl("");
// //     setSizes([{ label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false }]);
// //     setEditingProductId(null);

// //     loadProducts(search);
// //   }

// //   async function handleDeleteProduct(id) {
// //     if (!confirm("Delete product and its sizes?")) return;
// //     await supabase.from("products").delete().eq("id", id);
// //     loadProducts(search);
// //   }

// //   async function handleMainFileChange(e) {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     try {
// //       setUploadingMain(true);
// //       const url = await uploadImage(file);
// //       setMainImageUrl(url);
// //     } catch (err) {
// //       alert("Upload failed");
// //       console.error(err);
// //     } finally {
// //       setUploadingMain(false);
// //     }
// //   }

// //   // Camera capture for main
// //   async function handleMainCameraCapture(e) {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     try {
// //       setUploadingMain(true);
// //       const url = await uploadImage(file);
// //       setMainImageUrl(url);
// //     } catch (err) {
// //       alert("Camera upload failed");
// //       console.error(err);
// //     } finally {
// //       setUploadingMain(false);
// //     }
// //   }

// //   async function handleSizeFileChange(idx, e) {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     const copy = [...sizes];
// //     copy[idx].uploading = true;
// //     setSizes(copy);
// //     try {
// //       const url = await uploadImage(file);
// //       copy[idx].image_url = url;
// //     } catch (err) {
// //       alert("Upload failed");
// //       console.error(err);
// //     } finally {
// //       copy[idx].uploading = false;
// //       setSizes([...copy]);
// //     }
// //   }

// //   async function handleSizeCameraCapture(idx, e) {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     const copy = [...sizes];
// //     copy[idx].uploading = true;
// //     setSizes(copy);
// //     try {
// //       const url = await uploadImage(file);
// //       copy[idx].image_url = url;
// //     } catch (err) {
// //       alert("Camera upload failed");
// //       console.error(err);
// //     } finally {
// //       copy[idx].uploading = false;
// //       setSizes([...copy]);
// //     }
// //   }

// //   const handleEditFromList = (product) => {
// //     // Prefill form and go to admin
// //     setEditingProductId(product.id);
// //     setProductName(product.name);
// //     setProductBlock(product.block || "");
// //     setMainImageUrl(product.main_image_url || "");
// //     setSizes(
// //       product.product_sizes?.length
// //         ? product.product_sizes.map((s) => ({
// //             label: s.label || "",
// //             litres: s.litres || "",
// //             price: s.price ?? "",
// //             pasal_price: s.pasal_price ?? "",
// //             image_url: s.image_url || "",
// //             uploading: false,
// //           }))
// //         : [{ label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false }]
// //     );
// //     navigate("/admin");
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   const userPanel = (
// //     <UserPanel
// //       products={products}
// //       loading={loading}
// //       search={search}
// //       onSearchChange={(e) => setSearch(e.target.value)}
// //       isAdmin={isAdmin}
// //       onDelete={handleDeleteProduct}
// //       onEdit={handleEditFromList}
// //     />
// //   );

// //   return (
// //     <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
// //       <div className="max-w-5xl mx-auto p-4 space-y-8">
// //         <header className="flex flex-col md:flex-row md:items-end justify-between border-b pb-4 gap-4">
// //           <div>
// //             <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Drinks Shop</h1>
// //             <p className="text-slate-500 mt-1">Premium selection catalog</p>
// //           </div>
// //           <nav className="flex items-center gap-2">
// //             {NAV_LINKS.map((link) => {
// //               const isActive =
// //                 link.path === "/"
// //                   ? location.pathname === "/"
// //                   : location.pathname.startsWith(link.path);
// //               return (
// //                 <Link
// //                   key={link.path}
// //                   to={link.path}
// //                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
// //                     isActive
// //                       ? "bg-slate-900 text-white shadow-md"
// //                       : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:bg-slate-50"
// //                   }`}
// //                 >
// //                   {link.label}
// //                 </Link>
// //               );
// //             })}
// //           </nav>
// //         </header>

// //         <Routes>
// //           <Route
// //             path="/admin"
// //             element={
// //               <div className="space-y-8 animate-fade-in">
// //                 {/* Login Section */}
// //                 {!isAdmin && (
// //                   <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-md mx-auto border border-slate-100">
// //                     <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
// //                     <p className="text-sm text-slate-500 mb-6">Enter PIN (12345) to manage inventory.</p>
// //                     <div className="flex gap-2">
// //                       <input
// //                         type="password"
// //                         className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
// //                         placeholder="PIN Code"
// //                         value={pin}
// //                         onChange={(e) => setPin(e.target.value)}
// //                       />
// //                       <button
// //                         onClick={handleLogin}
// //                         className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition shadow-lg"
// //                       >
// //                         Login
// //                       </button>
// //                     </div>
// //                   </section>
// //                 )}

// //                 {/* Product Form */}
// //                 {isAdmin && (
// //                   <section className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100">
// //                     <div className="flex items-center justify-between mb-6 border-b pb-4">
// //                       <h2 className="text-2xl font-bold text-slate-800">
// //                         {editingProductId ? "Edit Product" : "Add New Product"}
// //                       </h2>
// //                       <div className="flex gap-2">
// //                         {editingProductId && (
// //                           <button 
// //                             onClick={() => {
// //                               setEditingProductId(null);
// //                               setProductName("");
// //                               setProductBlock("");
// //                               setMainImageUrl("");
// //                               setSizes([{ label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false }]);
// //                             }}
// //                             className="text-sm px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
// //                           >
// //                             Cancel
// //                           </button>
// //                         )}
// //                         <button
// //                           onClick={addSizeRow}
// //                           className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-100 transition border border-emerald-200"
// //                         >
// //                           + Add Variant
// //                         </button>
// //                       </div>
// //                     </div>

// //                     <div className="grid gap-6 md:grid-cols-2 mb-8">
// //                       <div className="space-y-2">
// //                         <label className="text-sm font-semibold text-slate-700">Product Name</label>
// //                         <input
// //                           className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
// //                           value={productName}
// //                           onChange={(e) => setProductName(e.target.value)}
// //                           placeholder="e.g. Black Label"
// //                         />
// //                       </div>
// //                       <div className="space-y-2">
// //                         <label className="text-sm font-semibold text-slate-700">Block Location</label>
// //                         <input
// //                           className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
// //                           value={productBlock}
// //                           onChange={(e) => setProductBlock(e.target.value)}
// //                           placeholder="e.g. 12"
// //                         />
// //                       </div>
// //                       <div className="md:col-span-2 space-y-2">
// //                         <label className="text-sm font-semibold text-slate-700">Main Image</label>
// //                         <div className="flex flex-wrap items-center gap-3 p-4 border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-50 transition">
// //                           <input type="file" accept="image/*" onChange={handleMainFileChange} className="text-sm text-slate-600" />
// //                           <button
// //                             type="button"
// //                             onClick={() => mainCameraInputRef.current?.click()}
// //                             className="text-sm px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
// //                           >
// //                             📷 Camera
// //                           </button>
// //                           {/* <input
// //                             ref={mainCameraInputRef}
// //                             type="file"
// //                             accept="image/*"
// //                             capture="environment"
// //                             className="hidden"
// //                             onChange={handleMainCameraCapture}
// //                           /> */}
// //                           <input
// //   ref={mainCameraInputRef}
// //   type="file"
// //   accept="image/*"
// //   capture="environment"
// //   className="hidden"
// //   onChange={handleMainCameraCapture}
// // />
// //                           {uploadingMain && <span className="text-sm text-blue-600 font-medium">Uploading...</span>}
// //                           {mainImageUrl && (
// //                             <img src={mainImageUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg shadow-sm" />
// //                           )}
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="space-y-4 mb-8">
// //                       <h3 className="text-lg font-bold text-slate-700">Size Variants</h3>
// //                       {sizes.map((s, idx) => (
// //                         <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid gap-4 md:grid-cols-12 items-center">
// //                           {/* <div className="md:col-span-2">
// //                             <input
// //                               className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
// //                               placeholder="Label (e.g. Bottle)"
// //                               value={s.label}
// //                               onChange={(e) => updateSizeRow(idx, "label", e.target.value)}
// //                             />
// //                           </div> */}
// //                           <div className="md:col-span-2">
// //                             <input
// //                               className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
// //                               placeholder="Vol (e.g. 750ml)"
// //                               value={s.litres}
// //                               onChange={(e) => updateSizeRow(idx, "litres", e.target.value)}
// //                             />
// //                           </div>
// //                           <div className="md:col-span-2">
// //                             <input
// //                               className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
// //                               type="number"
// //                               placeholder="Price (NPR)"
// //                               value={s.price}
// //                               onChange={(e) => updateSizeRow(idx, "price", e.target.value)}
// //                             />
// //                           </div>
// //                           <div className="md:col-span-2">
// //                             <input
// //                               className="w-full border-2 border-transparent bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded px-3 py-2 text-sm"
// //                               style={{ borderImage: "linear-gradient(90deg, #3b82f6, #06b6d4) 1" }}
// //                               type="number"
// //                               placeholder="Pasal price (NPR)"
// //                               value={s.pasal_price}
// //                               onChange={(e) => updateSizeRow(idx, "pasal_price", e.target.value)}
// //                             />
// //                           </div>
// //                           <div className="md:col-span-3 flex items-center gap-2">
// //                             <input
// //                               type="file"
// //                               className="text-xs w-full"
// //                               accept="image/*"
// //                               onChange={(e) => handleSizeFileChange(idx, e)}
// //                             />
// //                             <button
// //                               type="button"
// //                               onClick={() => {
// //                                 if (!sizeCameraInputRefs.current[idx]) return;
// //                                 sizeCameraInputRefs.current[idx].click();
// //                               }}
// //                               className="text-xs px-3 py-2 rounded bg-slate-900 text-white hover:bg-slate-800"
// //                             >
// //                               📷
// //                             </button>
// //                             {/* <input
// //                               ref={(el) => (sizeCameraInputRefs.current[idx] = el)}
// //                               type="file"
// //                               accept="image/*"
// //                               capture="environment"
// //                               className="hidden"
// //                               onChange={(e) => handleSizeCameraCapture(idx, e)}
// //                             /> */}
// //                             <input
// //   ref={(el) => (sizeCameraInputRefs.current[idx] = el)}
// //   type="file"
// //   accept="image/*"
// //   capture="environment"
// //   className="hidden"
// //   onChange={(e) => handleSizeCameraCapture(idx, e)}
// // />
// //                             {s.image_url && <img src={s.image_url} className="w-10 h-10 rounded border object-cover" />}
// //                           </div>
// //                           <div className="md:col-span-1 text-right">
// //                             <button
// //                               onClick={() => removeSizeRow(idx)}
// //                               className="text-red-500 hover:text-red-700"
// //                               disabled={sizes.length === 1}
// //                             >
// //                               ✕
// //                             </button>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>

// //                     <button
// //                       onClick={handleAddOrUpdateProduct}
// //                       className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-xl"
// //                     >
// //                       {editingProductId ? "Update Product" : "Save Product"}
// //                     </button>
// //                   </section>
// //                 )}
// //               </div>
// //             }
// //           />
// //           <Route path="/" element={userPanel} />
// //           <Route path="*" element={userPanel} />
// //         </Routes>
// //       </div>
// //     </div>
// //   );
// // }

// // // ----- User Panel (unchanged except for using new price fields if desired) -----
// // function UserPanel({
// //   products,
// //   loading,
// //   search,
// //   onSearchChange,
// //   isAdmin,
// //   onDelete,
// //   onEdit,
// // }) {
// //   const [expandedId, setExpandedId] = useState(null);

// //   const toggleProduct = (id) => {
// //     setExpandedId((prev) => (prev === id ? null : id));
// //   };

// //   return (
// //     <section className="space-y-6">
// //       <div className="relative">
// //         <input
// //           className="w-full bg-white border-0 shadow-sm rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-slate-900 outline-none"
// //           placeholder="Search products..."
// //           value={search}
// //           onChange={onSearchChange}
// //         />
// //         <svg className="absolute right-6 top-5 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
// //       </div>

// //       {loading && (
// //         <div className="flex justify-center py-10">
// //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
// //         </div>
// //       )}

// //       <div className="space-y-4">
// //         {products.map((p) => {
// //           const mainImg = getMainImage(p);
// //           const isExpanded = expandedId === p.id;
          
// //           return (
// //             <div 
// //               key={p.id} 
// //               className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-slate-900 shadow-lg' : 'hover:shadow-md'}`}
// //             >
// //               <div 
// //                 onClick={() => toggleProduct(p.id)}
// //                 className="flex items-center p-4 cursor-pointer select-none"
// //               >
// //                 <div className="relative h-20 w-20 flex-shrink-0">
// //                   <img
// //                     src={mainImg}
// //                     alt={p.name}
// //                     className="w-full h-full object-cover rounded-lg bg-slate-100"
// //                   />
// //                 </div>
                
// //                 <div className="ml-5 flex-1">
// //                   <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
// //                   <div className="flex items-center gap-2 mt-1">
// //                      {!isExpanded && (
// //                        <span className="text-sm text-slate-500 font-medium">
// //                          {p.product_sizes?.length || 0} variants available
// //                        </span>
// //                      )}
// //                      {p.block && (
// //                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
// //                          Block {p.block}
// //                        </span>
// //                      )}
// //                   </div>
// //                 </div>

// //                 <div className="px-4">
// //                   <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
// //                     <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //                     </svg>
// //                   </div>
// //                 </div>
// //               </div>

// //               {isAdmin && (
// //                 <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex gap-4 text-sm">
// //                    <button onClick={() => onEdit?.(p)} className="text-blue-600 font-medium hover:underline">Edit Product</button>
// //                    <button onClick={() => onDelete?.(p.id)} className="text-red-600 font-medium hover:underline">Delete Product</button>
// //                 </div>
// //               )}

// //               {isExpanded && (
// //                 <div className="bg-slate-50 border-t border-slate-100 p-6 animate-fade-in">
// //                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
// //                     {(p.product_sizes || []).map((s) => (
// //                       <div 
// //                         key={s.id} 
// //                         className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
// //                       >
// //                         <div className="h-32 w-full mb-3 flex items-center justify-center bg-white rounded-lg overflow-hidden">
// //                           <img 
// //                             src={s.image_url || mainImg} 
// //                             alt={s.label} 
// //                             className="h-full w-full object-contain hover:scale-105 transition-transform duration-300" 
// //                           />
// //                         </div>
// //                         <div className="text-sm font-semibold text-slate-700">
// //                           Volume: {s.litres || "N/A"}
// //                         </div>
// //                         <div className="text-lg font-black text-slate-900 mb-1">
// //                           NPR: {s.price}
// //                         </div>
// //                         {s.pasal_price !== null && s.pasal_price !== undefined && s.pasal_price !== "" && (
// //                           <div className="text-xs font-semibold text-blue-600">
// //                             Pasal: NPR {s.pasal_price}
// //                           </div>
// //                         )}
// //                         <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mt-1">
// //                           Block: {p.block || "N/A"}
// //                         </div>
// //                       </div>
// //                     ))}
// //                     {(!p.product_sizes || p.product_sizes.length === 0) && (
// //                       <div className="col-span-full text-center py-4 text-slate-500 italic">
// //                         No sizes available for this product.
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           );
// //         })}

// //         {products.length === 0 && !loading && (
// //           <div className="text-center py-12 text-slate-500">
// //             No products found matching your search.
// //           </div>
// //         )}
// //       </div>
// //     </section>
// //   );
// // }

// // onl admin can edit


// import { useEffect, useRef, useState } from "react";
// import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import { supabase } from "./supabaseClient";
// import "./index.css";

// const ADMIN_PIN = "12345";
// const NO_IMAGE = "https://placehold.co/300x200?text=No+Image";

// const NAV_LINKS = [
//   { path: "/", label: "User View" },
//   { path: "/admin", label: "Admin Panel" },
// ];

// function getMainImage(product) {
//   const main = product.main_image_url;
//   const firstSizeWithImage = product.product_sizes?.find((s) => s.image_url)?.image_url;
//   return main || firstSizeWithImage || NO_IMAGE;
// }

// export default function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [pin, setPin] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Form state
//   const [productName, setProductName] = useState("");
//   const [productBlock, setProductBlock] = useState("");
//   const [mainImageUrl, setMainImageUrl] = useState("");
//   const [uploadingMain, setUploadingMain] = useState(false);
//   const [sizes, setSizes] = useState([
//     { label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false },
//   ]);

//   // Editing state
//   const [editingProductId, setEditingProductId] = useState(null);

//   // Refs for camera capture
//   const mainCameraInputRef = useRef(null);
//   const sizeCameraInputRefs = useRef({}); // { idx: ref }

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   useEffect(() => {
//     const delay = setTimeout(() => loadProducts(search), 300);
//     return () => clearTimeout(delay);
//   }, [search]);

//   // Upload helper
//   async function uploadImage(file) {
//     const ext = file.name.split(".").pop();
//     const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
//     const { error } = await supabase.storage
//       .from("product-images")
//       .upload(path, file, { upsert: true });
//     if (error) throw error;
//     const { data } = supabase.storage.from("product-images").getPublicUrl(path);
//     return data.publicUrl;
//   }

//   // Fetch products + sizes
//   async function loadProducts(term = "") {
//     setLoading(true);
//     const query = supabase
//       .from("products")
//       .select(
//         "id, name, block, main_image_url, product_sizes(id, label, litres, price, pasal_price, image_url)"
//       )
//       .order("name", { ascending: true });
//     if (term) query.ilike("name", `%${term}%`);
//     const { data, error } = await query;
//     if (!error && data) setProducts(data);
//     setLoading(false);
//   }

//   function handleLogin() {
//     if (pin === ADMIN_PIN) {
//       setIsAdmin(true);
//       setPin("");
//       navigate("/admin");
//     } else {
//       alert("Wrong PIN");
//     }
//   }

//   function addSizeRow() {
//     setSizes([
//       ...sizes,
//       { label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false },
//     ]);
//   }

//   function updateSizeRow(idx, key, value) {
//     const copy = [...sizes];
//     copy[idx][key] = value;
//     setSizes(copy);
//   }

//   function removeSizeRow(idx) {
//     if (sizes.length === 1) return;
//     setSizes(sizes.filter((_, i) => i !== idx));
//   }

//   async function handleAddOrUpdateProduct() {
//     if (!productName) {
//       alert("Please add product name");
//       return;
//     }

//     if (!editingProductId) {
//       // CREATE
//       const { data: product, error: pErr } = await supabase
//         .from("products")
//         .insert([
//           { name: productName, block: productBlock, main_image_url: mainImageUrl || null },
//         ])
//         .select()
//         .single();

//       if (pErr || !product) {
//         alert("Error adding product");
//         return;
//       }

//       // sizes
//       const payload = sizes
//         .filter((s) => s.label && s.price !== "")
//         .map((s) => ({
//           product_id: product.id,
//           label: s.label,
//           litres: s.litres,
//           price: Number(s.price),
//           pasal_price: s.pasal_price === "" ? null : Number(s.pasal_price),
//           image_url: s.image_url || null,
//         }));
//       if (payload.length) {
//         const { error: sErr } = await supabase.from("product_sizes").insert(payload);
//         if (sErr) alert("Error adding sizes");
//       }
//     } else {
//       // UPDATE product + sizes
//       const pid = editingProductId;

//       await supabase
//         .from("products")
//         .update({
//           name: productName,
//           block: productBlock,
//           main_image_url: mainImageUrl || null,
//         })
//         .eq("id", pid);

//       // Replace sizes: delete then insert new
//       await supabase.from("product_sizes").delete().eq("product_id", pid);
//       const payload = sizes
//         .filter((s) => s.label && s.price !== "")
//         .map((s) => ({
//           product_id: pid,
//           label: s.label,
//           litres: s.litres,
//           price: Number(s.price),
//           pasal_price: s.pasal_price === "" ? null : Number(s.pasal_price),
//           image_url: s.image_url || null,
//         }));
//       if (payload.length) {
//         await supabase.from("product_sizes").insert(payload);
//       }
//     }

//     // reset form
//     setProductName("");
//     setProductBlock("");
//     setMainImageUrl("");
//     setSizes([{ label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false }]);
//     setEditingProductId(null);

//     loadProducts(search);
//   }

//   async function handleDeleteProduct(id) {
//     if (!confirm("Delete product and its sizes?")) return;
//     await supabase.from("products").delete().eq("id", id);
//     loadProducts(search);
//   }

//   async function handleMainFileChange(e) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     try {
//       setUploadingMain(true);
//       const url = await uploadImage(file);
//       setMainImageUrl(url);
//     } catch (err) {
//       alert("Upload failed");
//       console.error(err);
//     } finally {
//       setUploadingMain(false);
//     }
//   }

//   // Camera capture for main
//   async function handleMainCameraCapture(e) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     try {
//       setUploadingMain(true);
//       const url = await uploadImage(file);
//       setMainImageUrl(url);
//     } catch (err) {
//       alert("Camera upload failed");
//       console.error(err);
//     } finally {
//       setUploadingMain(false);
//     }
//   }

//   async function handleSizeFileChange(idx, e) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const copy = [...sizes];
//     copy[idx].uploading = true;
//     setSizes(copy);
//     try {
//       const url = await uploadImage(file);
//       copy[idx].image_url = url;
//     } catch (err) {
//       alert("Upload failed");
//       console.error(err);
//     } finally {
//       copy[idx].uploading = false;
//       setSizes([...copy]);
//     }
//   }

//   async function handleSizeCameraCapture(idx, e) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const copy = [...sizes];
//     copy[idx].uploading = true;
//     setSizes(copy);
//     try {
//       const url = await uploadImage(file);
//       copy[idx].image_url = url;
//     } catch (err) {
//       alert("Camera upload failed");
//       console.error(err);
//     } finally {
//       copy[idx].uploading = false;
//       setSizes([...copy]);
//     }
//   }

//   const handleEditFromList = (product) => {
//     // Prefill form and go to admin
//     setEditingProductId(product.id);
//     setProductName(product.name);
//     setProductBlock(product.block || "");
//     setMainImageUrl(product.main_image_url || "");
//     setSizes(
//       product.product_sizes?.length
//         ? product.product_sizes.map((s) => ({
//             label: s.label || "",
//             litres: s.litres || "",
//             price: s.price ?? "",
//             pasal_price: s.pasal_price ?? "",
//             image_url: s.image_url || "",
//             uploading: false,
//           }))
//         : [{ label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false }]
//     );
//     navigate("/admin");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
//       <div className="max-w-5xl mx-auto p-4 space-y-8">
//         <header className="flex flex-col md:flex-row md:items-end justify-between border-b pb-4 gap-4">
//           <div>
//             <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Drinks Shop</h1>
//             <p className="text-slate-500 mt-1">Premium selection catalog</p>
//           </div>
//           <nav className="flex items-center gap-2">
//             {NAV_LINKS.map((link) => {
//               const isActive =
//                 link.path === "/"
//                   ? location.pathname === "/"
//                   : location.pathname.startsWith(link.path);
//               return (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                     isActive
//                       ? "bg-slate-900 text-white shadow-md"
//                       : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:bg-slate-50"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               );
//             })}
//           </nav>
//         </header>

//         <Routes>
//           <Route
//             path="/admin"
//             element={
//               <div className="space-y-8 animate-fade-in">
//                 {/* Login Section */}
//                 {!isAdmin && (
//                   <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-md mx-auto border border-slate-100">
//                     <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
//                     <p className="text-sm text-slate-500 mb-6">Enter PIN (12345) to manage inventory.</p>
//                     <div className="flex gap-2">
//                       <input
//                         type="password"
//                         className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
//                         placeholder="PIN Code"
//                         value={pin}
//                         onChange={(e) => setPin(e.target.value)}
//                       />
//                       <button
//                         onClick={handleLogin}
//                         className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition shadow-lg"
//                       >
//                         Login
//                       </button>
//                     </div>
//                   </section>
//                 )}

//                 {/* Product Form */}
//                 {isAdmin && (
//                   <section className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100">
//                     <div className="flex items-center justify-between mb-6 border-b pb-4">
//                       <h2 className="text-2xl font-bold text-slate-800">
//                         {editingProductId ? "Edit Product" : "Add New Product"}
//                       </h2>
//                       <div className="flex gap-2">
//                         {editingProductId && (
//                           <button 
//                             onClick={() => {
//                               setEditingProductId(null);
//                               setProductName("");
//                               setProductBlock("");
//                               setMainImageUrl("");
//                               setSizes([{ label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false }]);
//                             }}
//                             className="text-sm px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
//                           >
//                             Cancel
//                           </button>
//                         )}
//                         <button
//                           onClick={addSizeRow}
//                           className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-100 transition border border-emerald-200"
//                         >
//                           + Add Variant
//                         </button>
//                       </div>
//                     </div>

//                     <div className="grid gap-6 md:grid-cols-2 mb-8">
//                       <div className="space-y-2">
//                         <label className="text-sm font-semibold text-slate-700">Product Name</label>
//                         <input
//                           className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
//                           value={productName}
//                           onChange={(e) => setProductName(e.target.value)}
//                           placeholder="e.g. Black Label"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-sm font-semibold text-slate-700">Block Location</label>
//                         <input
//                           className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
//                           value={productBlock}
//                           onChange={(e) => setProductBlock(e.target.value)}
//                           placeholder="e.g. 12"
//                         />
//                       </div>
//                       <div className="md:col-span-2 space-y-2">
//                         <label className="text-sm font-semibold text-slate-700">Main Image</label>
//                         <div className="flex flex-wrap items-center gap-3 p-4 border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-50 transition">
//                           <input type="file" accept="image/*" onChange={handleMainFileChange} className="text-sm text-slate-600" />
//                           <button
//                             type="button"
//                             onClick={() => mainCameraInputRef.current?.click()}
//                             className="text-sm px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
//                           >
//                             📷 Camera
//                           </button>
//                           <input
//                             ref={mainCameraInputRef}
//                             type="file"
//                             accept="image/*"
//                             capture="environment"
//                             className="hidden"
//                             onChange={handleMainCameraCapture}
//                           />
//                           {uploadingMain && <span className="text-sm text-blue-600 font-medium">Uploading...</span>}
//                           {mainImageUrl && (
//                             <img src={mainImageUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg shadow-sm" />
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-4 mb-8">
//                       <h3 className="text-lg font-bold text-slate-700">Size Variants</h3>
//                       {sizes.map((s, idx) => (
//                         <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid gap-4 md:grid-cols-12 items-center">
//                           <div className="md:col-span-2">
//                             <input
//                               className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
//                               placeholder="Vol (e.g. 750ml)"
//                               value={s.litres}
//                               onChange={(e) => updateSizeRow(idx, "litres", e.target.value)}
//                             />
//                           </div>
//                           <div className="md:col-span-2">
//                             <input
//                               className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
//                               type="number"
//                               placeholder="Price (NPR)"
//                               value={s.price}
//                               onChange={(e) => updateSizeRow(idx, "price", e.target.value)}
//                             />
//                           </div>
//                           <div className="md:col-span-2">
//                             <input
//                               className="w-full border-2 border-transparent bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded px-3 py-2 text-sm"
//                               style={{ borderImage: "linear-gradient(90deg, #3b82f6, #06b6d4) 1" }}
//                               type="number"
//                               placeholder="Pasal price (NPR)"
//                               value={s.pasal_price}
//                               onChange={(e) => updateSizeRow(idx, "pasal_price", e.target.value)}
//                             />
//                           </div>
//                           <div className="md:col-span-3 flex items-center gap-2">
//                             <input
//                               type="file"
//                               className="text-xs w-full"
//                               accept="image/*"
//                               onChange={(e) => handleSizeFileChange(idx, e)}
//                             />
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 if (!sizeCameraInputRefs.current[idx]) return;
//                                 sizeCameraInputRefs.current[idx].click();
//                               }}
//                               className="text-xs px-3 py-2 rounded bg-slate-900 text-white hover:bg-slate-800"
//                             >
//                               📷
//                             </button>
//                             <input
//                               ref={(el) => (sizeCameraInputRefs.current[idx] = el)}
//                               type="file"
//                               accept="image/*"
//                               capture="environment"
//                               className="hidden"
//                               onChange={(e) => handleSizeCameraCapture(idx, e)}
//                             />
//                             {s.image_url && <img src={s.image_url} className="w-10 h-10 rounded border object-cover" />}
//                           </div>
//                           <div className="md:col-span-1 text-right">
//                             <button
//                               onClick={() => removeSizeRow(idx)}
//                               className="text-red-500 hover:text-red-700"
//                               disabled={sizes.length === 1}
//                             >
//                               ✕
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <button
//                       onClick={handleAddOrUpdateProduct}
//                       className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-xl"
//                     >
//                       {editingProductId ? "Update Product" : "Save Product"}
//                     </button>
//                   </section>
//                 )}

//                 {/* Admin Product List with edit/delete */}
//                 {isAdmin && (
//                   <section className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100">
//                     <div className="flex items-center justify-between mb-4">
//                       <h2 className="text-xl font-bold text-slate-800">Products</h2>
//                       {loading && <span className="text-sm text-slate-500">Refreshing…</span>}
//                     </div>
//                     <div className="space-y-3">
//                       {products.map((p) => {
//                         const mainImg = getMainImage(p);
//                         return (
//                           <div
//                             key={p.id}
//                             className="flex items-center gap-4 border border-slate-200 rounded-xl p-3 hover:shadow-sm transition"
//                           >
//                             <img
//                               src={mainImg}
//                               alt={p.name}
//                               className="h-16 w-16 object-cover rounded-lg bg-slate-100"
//                             />
//                             <div className="flex-1">
//                               <div className="font-semibold text-slate-900">{p.name}</div>
//                               <div className="text-xs text-slate-500">
//                                 Block: {p.block || "N/A"} · Variants: {p.product_sizes?.length || 0}
//                               </div>
//                             </div>
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => handleEditFromList(p)}
//                                 className="text-sm px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteProduct(p.id)}
//                                 className="text-sm px-3 py-1.5 rounded bg-red-100 text-red-700 hover:bg-red-200"
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           </div>
//                         );
//                       })}
//                       {products.length === 0 && (
//                         <div className="text-sm text-slate-500">No products yet.</div>
//                       )}
//                     </div>
//                   </section>
//                 )}
//               </div>
//             }
//           />
//           {/* User View (no edit/delete) */}
//           <Route
//             path="/"
//             element={
//               <UserPanel
//                 products={products}
//                 loading={loading}
//                 search={search}
//                 onSearchChange={(e) => setSearch(e.target.value)}
//               />
//             }
//           />
//           <Route
//             path="*"
//             element={
//               <UserPanel
//                 products={products}
//                 loading={loading}
//                 search={search}
//                 onSearchChange={(e) => setSearch(e.target.value)}
//               />
//             }
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// // ----- User Panel (no admin actions) -----
// function UserPanel({
//   products,
//   loading,
//   search,
//   onSearchChange,
// }) {
//   const [expandedId, setExpandedId] = useState(null);

//   const toggleProduct = (id) => {
//     setExpandedId((prev) => (prev === id ? null : id));
//   };

//   return (
//     <section className="space-y-6">
//       <div className="relative">
//         <input
//           className="w-full bg-white border-0 shadow-sm rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-slate-900 outline-none"
//           placeholder="Search products..."
//           value={search}
//           onChange={onSearchChange}
//         />
//         <svg className="absolute right-6 top-5 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//       </div>

//       {loading && (
//         <div className="flex justify-center py-10">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
//         </div>
//       )}

//       <div className="space-y-4">
//         {products.map((p) => {
//           const mainImg = getMainImage(p);
//           const isExpanded = expandedId === p.id;
          
//           return (
//             <div 
//               key={p.id} 
//               className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-slate-900 shadow-lg' : 'hover:shadow-md'}`}
//             >
//               <div 
//                 onClick={() => toggleProduct(p.id)}
//                 className="flex items-center p-4 cursor-pointer select-none"
//               >
//                 <div className="relative h-20 w-20 flex-shrink-0">
//                   <img
//                     src={mainImg}
//                     alt={p.name}
//                     className="w-full h-full object-cover rounded-lg bg-slate-100"
//                   />
//                 </div>
                
//                 <div className="ml-5 flex-1">
//                   <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
//                   <div className="flex items-center gap-2 mt-1">
//                      {!isExpanded && (
//                        <span className="text-sm text-slate-500 font-medium">
//                          {p.product_sizes?.length || 0} variants available
//                        </span>
//                      )}
//                      {p.block && (
//                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
//                          Block {p.block}
//                        </span>
//                      )}
//                   </div>
//                 </div>

//                 <div className="px-4">
//                   <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
//                     <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {isExpanded && (
//                 <div className="bg-slate-50 border-t border-slate-100 p-6 animate-fade-in">
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                     {(p.product_sizes || []).map((s) => (
//                       <div 
//                         key={s.id} 
//                         className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
//                       >
//                         <div className="h-32 w-full mb-3 flex items-center justify-center bg-white rounded-lg overflow-hidden">
//                           <img 
//                             src={s.image_url || mainImg} 
//                             alt={s.label} 
//                             className="h-full w-full object-contain hover:scale-105 transition-transform duration-300" 
//                           />
//                         </div>
//                         <div className="text-sm font-semibold text-slate-700">
//                           Volume: {s.litres || "N/A"}
//                         </div>
//                         <div className="text-lg font-black text-slate-900 mb-1">
//                           NPR: {s.price}
//                         </div>
//                         {s.pasal_price !== null && s.pasal_price !== undefined && s.pasal_price !== "" && (
//                           <div className="text-xs font-semibold text-blue-600">
//                             Pasal: NPR {s.pasal_price}
//                           </div>
//                         )}
//                         <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mt-1">
//                           Block: {p.block || "N/A"}
//                         </div>
//                       </div>
//                     ))}
//                     {(!p.product_sizes || p.product_sizes.length === 0) && (
//                       <div className="col-span-full text-center py-4 text-slate-500 italic">
//                         No sizes available for this product.
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         {products.length === 0 && !loading && (
//           <div className="text-center py-12 text-slate-500">
//             No products found matching your search.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }






import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./index.css";

const ADMIN_PIN = "12345";
const NO_IMAGE = "https://placehold.co/300x200?text=No+Image";

const NAV_LINKS = [
  { path: "/", label: "User View" },
  { path: "/admin", label: "Admin Panel" },
];

function getMainImage(product) {
  const main = product.main_image_url;
  const firstSizeWithImage = product.product_sizes?.find((s) => s.image_url)?.image_url;
  return main || firstSizeWithImage || NO_IMAGE;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [pin, setPin] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Form state
  const [productName, setProductName] = useState("");
  const [productBlock, setProductBlock] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [uploadingMain, setUploadingMain] = useState(false);
  const [sizes, setSizes] = useState([
    { label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false },
  ]);

  // Editing state
  const [editingProductId, setEditingProductId] = useState(null);

  // Refs for camera capture
  const mainCameraInputRef = useRef(null);
  const sizeCameraInputRefs = useRef({}); // { idx: ref }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => loadProducts(search), 300);
    return () => clearTimeout(delay);
  }, [search]);

  // Upload helper
  async function uploadImage(file) {
    const ext = file.name.split(".").pop();
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
  }

  // Fetch products + sizes
  async function loadProducts(term = "") {
    setLoading(true);
    const query = supabase
      .from("products")
      .select(
        "id, name, block, main_image_url, product_sizes(id, label, litres, price, pasal_price, image_url)"
      )
      .order("name", { ascending: true });
    if (term) query.ilike("name", `%${term}%`);
    const { data, error } = await query;
    if (!error && data) setProducts(data);
    setLoading(false);
  }

  function handleLogin() {
    if (pin === ADMIN_PIN) {
      setIsAdmin(true);
      setPin("");
      navigate("/admin");
    } else {
      alert("Wrong PIN");
    }
  }

  function addSizeRow() {
    setSizes([
      ...sizes,
      { label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false },
    ]);
  }

  function updateSizeRow(idx, key, value) {
    const copy = [...sizes];
    copy[idx][key] = value;
    setSizes(copy);
  }

  function removeSizeRow(idx) {
    if (sizes.length === 1) return;
    setSizes(sizes.filter((_, i) => i !== idx));
  }

  async function handleAddOrUpdateProduct() {
    if (!productName) {
      alert("Please add product name");
      return;
    }

    if (!editingProductId) {
      // CREATE
      const { data: product, error: pErr } = await supabase
        .from("products")
        .insert([
          { name: productName, block: productBlock, main_image_url: mainImageUrl || null },
        ])
        .select()
        .single();

      if (pErr || !product) {
        alert("Error adding product");
        return;
      }

      // sizes
      const payload = sizes
        .filter((s) => s.label && s.price !== "")
        .map((s) => ({
          product_id: product.id,
          label: s.label,
          litres: s.litres,
          price: Number(s.price),
          pasal_price: s.pasal_price === "" ? null : Number(s.pasal_price),
          image_url: s.image_url || null,
        }));
      if (payload.length) {
        const { error: sErr } = await supabase.from("product_sizes").insert(payload);
        if (sErr) alert("Error adding sizes");
      }
    } else {
      // UPDATE product + sizes
      const pid = editingProductId;

      await supabase
        .from("products")
        .update({
          name: productName,
          block: productBlock,
          main_image_url: mainImageUrl || null,
        })
        .eq("id", pid);

      // Replace sizes: delete then insert new
      await supabase.from("product_sizes").delete().eq("product_id", pid);
      const payload = sizes
        .filter((s) => s.label && s.price !== "")
        .map((s) => ({
          product_id: pid,
          label: s.label,
          litres: s.litres,
          price: Number(s.price),
          pasal_price: s.pasal_price === "" ? null : Number(s.pasal_price),
          image_url: s.image_url || null,
        }));
      if (payload.length) {
        await supabase.from("product_sizes").insert(payload);
      }
    }

    // reset form
    setProductName("");
    setProductBlock("");
    setMainImageUrl("");
    setSizes([{ label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false }]);
    setEditingProductId(null);

    loadProducts(search);
  }

  async function handleDeleteProduct(id) {
    if (!confirm("Delete product and its sizes?")) return;
    await supabase.from("products").delete().eq("id", id);
    loadProducts(search);
  }

  async function handleMainFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingMain(true);
      const url = await uploadImage(file);
      setMainImageUrl(url);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setUploadingMain(false);
    }
  }

  // Camera capture for main
  async function handleMainCameraCapture(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingMain(true);
      const url = await uploadImage(file);
      setMainImageUrl(url);
    } catch (err) {
      alert("Camera upload failed");
      console.error(err);
    } finally {
      setUploadingMain(false);
    }
  }

  async function handleSizeFileChange(idx, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const copy = [...sizes];
    copy[idx].uploading = true;
    setSizes(copy);
    try {
      const url = await uploadImage(file);
      copy[idx].image_url = url;
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      copy[idx].uploading = false;
      setSizes([...copy]);
    }
  }

  async function handleSizeCameraCapture(idx, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const copy = [...sizes];
    copy[idx].uploading = true;
    setSizes(copy);
    try {
      const url = await uploadImage(file);
      copy[idx].image_url = url;
    } catch (err) {
      alert("Camera upload failed");
      console.error(err);
    } finally {
      copy[idx].uploading = false;
      setSizes([...copy]);
    }
  }

  const handleEditFromList = (product) => {
    // Prefill form and go to admin
    setEditingProductId(product.id);
    setProductName(product.name);
    setProductBlock(product.block || "");
    setMainImageUrl(product.main_image_url || "");
    setSizes(
      product.product_sizes?.length
        ? product.product_sizes.map((s) => ({
            label: s.label || "",
            litres: s.litres || "",
            price: s.price ?? "",
            pasal_price: s.pasal_price ?? "",
            image_url: s.image_url || "",
            uploading: false,
          }))
        : [{ label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false }]
    );
    navigate("/admin");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto p-4 space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b pb-4 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Drinks Shop</h1>
            <p className="text-slate-500 mt-1">Premium selection catalog</p>
          </div>
          <nav className="flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <Routes>
          <Route
            path="/admin"
            element={
              <div className="space-y-8 animate-fade-in">
                {/* Login Section */}
                {!isAdmin && (
                  <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-md mx-auto border border-slate-100">
                    <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
                    <p className="text-sm text-slate-500 mb-6">Enter PIN (12345) to manage inventory.</p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="PIN Code"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                      />
                      <button
                        onClick={handleLogin}
                        className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition shadow-lg"
                      >
                        Login
                      </button>
                    </div>
                  </section>
                )}

                {/* Product Form */}
                {isAdmin && (
                  <section className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100">
                    <div className="flex items-center justify-between mb-6 border-b pb-4">
                      <h2 className="text-2xl font-bold text-slate-800">
                        {editingProductId ? "Edit Product" : "Add New Product"}
                      </h2>
                     
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 mb-8">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Product Name</label>
                        <input
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder="e.g. Black Label"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Block Location</label>
                        <input
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                          value={productBlock}
                          onChange={(e) => setProductBlock(e.target.value)}
                          placeholder="e.g. 12"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Main Image</label>
                        <div className="flex flex-wrap items-center gap-3 p-4 border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-50 transition">
                          <input type="file" accept="image/*" onChange={handleMainFileChange} className="text-sm text-slate-600" />
                          <button
                            type="button"
                            onClick={() => mainCameraInputRef.current?.click()}
                            className="text-sm px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                          >
                            📷 Camera
                          </button>
                          <input
                            ref={mainCameraInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            onChange={handleMainCameraCapture}
                          />
                          {uploadingMain && <span className="text-sm text-blue-600 font-medium">Uploading...</span>}
                          {mainImageUrl && (
                            <img src={mainImageUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg shadow-sm" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <h3 className="text-lg font-bold text-slate-700">Size Variants</h3>
                      {sizes.map((s, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid gap-4 md:grid-cols-12 items-center">
                          <div className="md:col-span-2">
                            <input
                              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                              placeholder="Vol (e.g. 750ml)"
                              value={s.litres}
                              onChange={(e) => updateSizeRow(idx, "litres", e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <input
                              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                              type="number"
                              placeholder="Price (NPR)"
                              value={s.price}
                              onChange={(e) => updateSizeRow(idx, "price", e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <input
                              className="w-full border-2 border-transparent bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded px-3 py-2 text-sm"
                              style={{ borderImage: "linear-gradient(90deg, #3b82f6, #06b6d4) 1" }}
                              type="number"
                              placeholder="Pasal price (NPR)"
                              value={s.pasal_price}
                              onChange={(e) => updateSizeRow(idx, "pasal_price", e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-3 flex items-center gap-2">
                            <input
                              type="file"
                              className="text-xs w-full"
                              accept="image/*"
                              onChange={(e) => handleSizeFileChange(idx, e)}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (!sizeCameraInputRefs.current[idx]) return;
                                sizeCameraInputRefs.current[idx].click();
                              }}
                              className="text-xs px-3 py-2 rounded bg-slate-900 text-white hover:bg-slate-800"
                            >
                              📷
                            </button>
                            <input
                              ref={(el) => (sizeCameraInputRefs.current[idx] = el)}
                              type="file"
                              accept="image/*"
                              capture="environment"
                              className="hidden"
                              onChange={(e) => handleSizeCameraCapture(idx, e)}
                            />
                            {s.image_url && <img src={s.image_url} className="w-10 h-10 rounded border object-cover" />}
                          </div>
                          <div className="md:col-span-1 text-right">
                            <button
                              onClick={() => removeSizeRow(idx)}
                              className="text-red-500 hover:text-red-700"
                              disabled={sizes.length === 1}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                     <div className="flex justify-center justify-center  mb-6">
                        {editingProductId && (
                          <button 
                            onClick={() => {
                              setEditingProductId(null);
                              setProductName("");
                              setProductBlock("");
                              setMainImageUrl("");
                              setSizes([{ label: "", litres: "", price: "", pasal_price: "", image_url: "", uploading: false }]);
                            }}
                            className="text-sm px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={addSizeRow}
                          className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-100 transition border border-emerald-200"
                        >
                          + Add Variant
                        </button>
                      </div>

                    <button
                      onClick={handleAddOrUpdateProduct}
                      className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-xl"
                    >
                      {editingProductId ? "Update Product" : "Save Product"}
                    </button>
                  </section>
                )}

                {/* Admin Product List with search + edit/delete */}
                {isAdmin && (
                  <section className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-bold text-slate-800">Products</h2>
                        {loading && <span className="text-sm text-slate-500">Refreshing…</span>}
                      </div>
                      <input
                        className="w-full md:w-72 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      {products.map((p) => {
                        const mainImg = getMainImage(p);
                        return (
                          <div
                            key={p.id}
                            className="flex items-center gap-4 border border-slate-200 rounded-xl p-3 hover:shadow-sm transition"
                          >
                            <img
                              src={mainImg}
                              alt={p.name}
                              className="h-16 w-16 object-cover rounded-lg bg-slate-100"
                            />
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900">{p.name}</div>
                              <div className="text-xs text-slate-500">
                                Block: {p.block || "N/A"} · Variants: {p.product_sizes?.length || 0}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditFromList(p)}
                                className="text-sm px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="text-sm px-3 py-1.5 rounded bg-red-100 text-red-700 hover:bg-red-200"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      {products.length === 0 && (
                        <div className="text-sm text-slate-500">No products yet.</div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            }
          />
          {/* User View (no edit/delete) */}
          <Route
            path="/"
            element={
              <UserPanel
                products={products}
                loading={loading}
                search={search}
                onSearchChange={(e) => setSearch(e.target.value)}
              />
            }
          />
          <Route
            path="*"
            element={
              <UserPanel
                products={products}
                loading={loading}
                search={search}
                onSearchChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

// ----- User Panel (no admin actions) -----
function UserPanel({
  products,
  loading,
  search,
  onSearchChange,
}) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleProduct = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="space-y-6">
      <div className="relative">
        <input
          className="w-full bg-white border-0 shadow-sm rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-slate-900 outline-none"
          placeholder="Search products..."
          value={search}
          onChange={onSearchChange}
        />
        <svg className="absolute right-6 top-5 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
        </div>
      )}

      <div className="space-y-4">
        {products.map((p) => {
          const mainImg = getMainImage(p);
          const isExpanded = expandedId === p.id;
          
          return (
            <div 
              key={p.id} 
              className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-slate-900 shadow-lg' : 'hover:shadow-md'}`}
            >
              <div 
                onClick={() => toggleProduct(p.id)}
                className="flex items-center p-4 cursor-pointer select-none"
              >
                <div className="relative h-20 w-20 flex-shrink-0">
                  <img
                    src={mainImg}
                    alt={p.name}
                    className="w-full h-full object-cover rounded-lg bg-slate-100"
                  />
                </div>
                
                <div className="ml-5 flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     {!isExpanded && (
                       <span className="text-sm text-slate-500 font-medium">
                         {p.product_sizes?.length || 0} variants available
                       </span>
                     )}
                     {p.block && (
                       <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
                         Block {p.block}
                       </span>
                     )}
                  </div>
                </div>

                <div className="px-4">
                  <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="bg-slate-50 border-t border-slate-100 p-6 animate-fade-in">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {(p.product_sizes || []).map((s) => (
                      <div 
                        key={s.id} 
                        className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                      >
                        <div className="h-32 w-full mb-3 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                          <img 
                            src={s.image_url || mainImg} 
                            alt={s.label} 
                            className="h-full w-full object-contain hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                        <div className="text-sm font-semibold text-slate-700">
                          Volume: {s.litres || "N/A"}
                        </div>
                        <div className="text-lg font-black text-slate-900 mb-1">
                          NPR: {s.price}
                        </div>
                        {s.pasal_price !== null && s.pasal_price !== undefined && s.pasal_price !== "" && (
                          <div className="text-xs font-semibold text-blue-600">
                            Pasal: NPR {s.pasal_price}
                          </div>
                        )}
                        <div className="text-xs font-bold uppercase tracking-wide text-slate-500 mt-1">
                          Block: {p.block || "N/A"}
                        </div>
                      </div>
                    ))}
                    {(!p.product_sizes || p.product_sizes.length === 0) && (
                      <div className="col-span-full text-center py-4 text-slate-500 italic">
                        No sizes available for this product.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {products.length === 0 && !loading && (
          <div className="text-center py-12 text-slate-500">
            No products found matching your search.
          </div>
        )}
      </div>
    </section>
  );
}