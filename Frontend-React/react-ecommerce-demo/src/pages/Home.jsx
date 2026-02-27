import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';

const Home = ({ searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('none');
    const [priceRange, setPriceRange] = useState(1000);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                // Set initial max price based on fetched data
                const max = Math.ceil(Math.max(...data.map(p => p.price)));
                setPriceRange(max);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to fetch products");
                setLoading(false);
            });
    }, []);

    const categories = useMemo(() => {
        const cats = products.map(p => p.category);
        return ['all', ...new Set(cats)];
    }, [products]);

    const maxProductPrice = useMemo(() => {
        if (products.length === 0) return 1000;
        return Math.ceil(Math.max(...products.map(p => p.price)));
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesPrice = product.price <= priceRange;
            return matchesSearch && matchesCategory && matchesPrice;
        });

        if (sortBy === 'name-asc') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'name-desc') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [searchTerm, selectedCategory, priceRange, sortBy, products]);

    if (loading) return (
        <div className="container py-5 text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading our collection...</p>
        </div>
    );

    if (error) return (
        <div className="container py-5">
            <div className="alert alert-danger">{error}</div>
        </div>
    );

    return (
        <div className="container py-5">
            <div className="row g-4 mb-4">
                {/* Filters Section */}
                <div className="col-lg-12">
                    <div className="card border-0 shadow-sm p-4 rounded-4">
                        <div className="row g-3 align-items-end">
                            {/* Category Filter */}
                            <div className="col-md-4">
                                <label className="form-label fw-bold small text-uppercase text-muted">Category</label>
                                <select
                                    className="form-select rounded-pill border-0 bg-light"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat} className="text-capitalize">{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort By */}
                            <div className="col-md-4">
                                <label className="form-label fw-bold small text-uppercase text-muted">Sort By</label>
                                <select
                                    className="form-select rounded-pill border-0 bg-light"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="none">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name-asc">Name: A to Z</option>
                                    <option value="name-desc">Name: Z to A</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="col-md-4">
                                <div className="d-flex justify-content-between">
                                    <label className="form-label fw-bold small text-uppercase text-muted">Price Range</label>
                                    <span className="fw-bold text-primary">${priceRange}</span>
                                </div>
                                <input
                                    type="range"
                                    className="form-range"
                                    min="0"
                                    max={maxProductPrice}
                                    step="10"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                />
                                <div className="d-flex justify-content-between small text-muted">
                                    <span>$0</span>
                                    <span>${maxProductPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id} className="col-12 col-md-6 col-lg-3">
                            <ProductCard product={product} />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <i className="bi bi-search display-3 text-muted mb-3"></i>
                        <h4>No products found</h4>
                        <p className="text-secondary">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
