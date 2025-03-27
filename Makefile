.PHONY: dev dev-frontend dev-backend prod prod-frontend prod-backend clean help

# Default target
.DEFAULT_GOAL := help

# Colors for terminal output
GREEN=\033[0;32m
YELLOW=\033[0;33m
NC=\033[0m # No Color

# Development environment
dev: ## Start the full development environment
	@echo "${GREEN}Starting full development environment...${NC}"
	docker-compose up

dev-frontend: ## Start only the frontend development server
	@echo "${GREEN}Starting frontend development server...${NC}"
	docker-compose up frontend

dev-backend: ## Start only the backend development server
	@echo "${GREEN}Starting backend development server...${NC}"
	docker-compose up backend

# Production environment
prod: ## Start the full production environment
	@echo "${GREEN}Starting full production environment...${NC}"
	docker-compose -f docker-compose.prod.yml up -d

prod-frontend: ## Start only the frontend production server
	@echo "${GREEN}Starting frontend production server...${NC}"
	docker-compose -f docker-compose.prod.yml up -d frontend

prod-backend: ## Start only the backend production server
	@echo "${GREEN}Starting backend production server...${NC}"
	docker-compose -f docker-compose.prod.yml up -d backend

# Clean up
clean: ## Remove containers and volumes
	@echo "${YELLOW}Cleaning up containers and volumes...${NC}"
	docker-compose down -v
	docker-compose -f docker-compose.prod.yml down -v

# Frontend helpers
install-frontend: ## Install frontend dependencies locally
	@echo "${GREEN}Installing frontend dependencies...${NC}"
	cd frontend && npm install

build-frontend: ## Build frontend for production
	@echo "${GREEN}Building frontend for production...${NC}"
	cd frontend && npm run build

# Backend helpers
install-backend: ## Install backend dependencies locally
	@echo "${GREEN}Installing backend dependencies...${NC}"
	cd backend && pip install -r requirements.txt

# Help command
help: ## Show this help
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'