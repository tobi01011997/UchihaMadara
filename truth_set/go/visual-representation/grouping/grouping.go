package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type ProductService struct {
	apiURL   string
	products []Product

	client *http.Client
}

func NewProductService() *ProductService {
	return &ProductService{
		apiURL:   "https://api.example.com",
		products: make([]Product, 0),
		client:   &http.Client{},
	}
}

func (s *ProductService) CreateProduct(name string, price float64) Product {
	newProduct := Product{
		ID:        s.generateID(),
		Name:      name,
		Price:     price,
		CreatedAt: time.Now(),
	}
	s.products = append(s.products, newProduct)
	fmt.Printf("Product %q created with ID %d\n", name, newProduct.ID)

	go s.saveProductToAPI(newProduct)
	return newProduct
}

func (s *ProductService) FetchProductFromAPI(id int) (*Product, error) {
	resp, err := http.Get(fmt.Sprintf("%s/products/%d", s.apiURL, id))
	if err != nil {
		return nil, fmt.Errorf("error fetching product: %v", err)
	}
	defer resp.Body.Close()

	var product Product
	if err := json.NewDecoder(resp.Body).Decode(&product); err != nil {
		return nil, fmt.Errorf("error decoding response: %v", err)
	}
	return &product, nil
}

func (s *ProductService) DeleteProduct(id int) {
	for i, p := range s.products {
		if p.ID == id {
			s.products = append(s.products[:i], s.products[i+1:]...)
			fmt.Printf("Product with ID %d deleted\n", id)
			return
		}
	}
}

func (s *ProductService) saveProductToAPI(product Product) error {
	data, err := json.Marshal(product)
    _ = data
	if err != nil {
		return err
	}

	_, err = http.Post(s.apiURL+"/products", "application/json", nil)
	return err
}

type Product struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Price     float64   `json:"price"`
	CreatedAt time.Time `json:"created_at"`
}

func (s *ProductService) generateID() int {
	maxID := 0
	for _, p := range s.products {
		if p.ID > maxID {
			maxID = p.ID
		}
	}
	return maxID + 1
}

func main() {
	service := NewProductService()
	service.CreateProduct("Tablet", 300)
	service.FetchProductFromAPI(2)
	service.DeleteProduct(1)
}
\ No newline at end of file