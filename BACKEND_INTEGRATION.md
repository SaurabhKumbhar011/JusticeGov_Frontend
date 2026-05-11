# Backend Integration Guide for Reports & Analytics Module

## Overview
The frontend Reports & Analytics module expects the following REST API endpoints from your backend server.

## Required Backend Endpoints

### 1. Get Dashboard Analytics
**Endpoint:** `GET /api/analytics/dashboard`

**Response (JSON):**
```json
{
  "totalCases": 12450,
  "totalHearings": 1203,
  "totalJudgements": 3456,
  "complianceRate": 94.5,
  "avgResolutionDays": 32,
  "filedCases": 2100
}
```

**Description:** Returns aggregated dashboard analytics data for the logged-in user.

---

### 2. Generate Report
**Endpoint:** `POST /api/reports/generate`

**Request Body (JSON):**
```json
{
  "scope": "ALL",
  "startDate": "2024-04-01",
  "endDate": "2024-04-24"
}
```

**Scope Values:**
- `ALL` - All data
- `CASE` - Cases only
- `HEARING` - Hearings only
- `JUDGEMENT` - Judgements only
- `COMPLIANCE` - Compliance only

**Response (JSON):**
```json
{
  "id": "RPT001",
  "scope": "ALL",
  "generatedDate": "2024-04-24",
  "metrics": {
    "totalCases": 12450,
    "totalHearings": 1203,
    "avgResolutionTime": 32,
    "complianceRate": 94.5
  }
}
```

**Description:** Generates a new report based on the specified scope and date range.

---

## Backend Configuration

### CORS Configuration (Important!)
Your backend must allow CORS requests from the frontend URL (`http://localhost:5173`).

**Spring Boot Example:**
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

---

## Frontend Service Files

### `reportService.js`
Located at: `src/services/reportService.js`

Uses `apiClient` to make HTTP requests to the backend. Update the `API_BASE` URL if needed:

```javascript
const API_BASE = "http://localhost:8085/api"; // Change if backend is on different port
```

---

## Testing the Integration

1. Start your backend server (ensure it's running on `http://localhost:8085`)
2. Start the frontend: `npm run dev`
3. Navigate to the Reports module
4. Check browser console for errors (press F12)
5. Verify analytics data loads on page load
6. Test "Generate Report" button to create reports

---

## Error Handling

If you see errors like:
- **CORS blocked**: Configure CORS on your backend
- **Network Error / Failed to connect**: Ensure backend is running on the correct port
- **404 Not Found**: Verify the endpoint paths match exactly

