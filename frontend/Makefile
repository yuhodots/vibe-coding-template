.PHONY: install dev build start lint clean

# Default target
.DEFAULT_GOAL := help

# Colors for terminal output
GREEN=\033[0;32m
YELLOW=\033[0;33m
NC=\033[0m # No Color

install: ## Install dependencies
	@echo "${GREEN}Installing dependencies...${NC}"
	npm install

dev: ## Run development server
	@echo "${GREEN}Starting development server...${NC}"
	npm run dev

build: ## Build for production
	@echo "${GREEN}Building for production...${NC}"
	npm run build

start: ## Start production server
	@echo "${GREEN}Starting production server...${NC}"
	npm run start

lint: ## Run linter
	@echo "${GREEN}Running linter...${NC}"
	npm run lint

clean: ## Clean build artifacts
	@echo "${YELLOW}Cleaning build artifacts...${NC}"
	rm -rf .next
	rm -rf node_modules

help: ## Show this help
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'