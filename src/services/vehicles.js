import { http, getHeaders } from "@/services/http-common";

const queryAllVehicles = `query allVehiclesPaginated($page: Int, $size: Int) {
    allVehiclesPaginated(page: $page, size: $size) { 
        edges {
            cursor
            node {
                id
                vin
                price
                name
            }
        }
        pageInfo {
            hasPreviousPage
            hasNextPage
        }
    }
}`;

const queryGetVehicle = `query getVehicle ($vehicleId: Int) { 
    getVehicleById (id: $vehicleId) {
        id
        vin
        name
        price
        company {
            name
            city
            province
            country
            firstName
            lastName
            email
        }
        description {
            id
            vin
            style_id
            description
        }
    }
}`;

class VehicleDataService {
  getAll({ page, size }) {
    return http.post(
      "/graphql",
      { query: queryAllVehicles, variables: { page, size } },
      {
        headers: getHeaders(),
      }
    );
  }

  get(vehicleId) {
    return http.post(
      `/graphql`,
      { query: queryGetVehicle, variables: { vehicleId } },
      {
        headers: getHeaders(),
      }
    );
  }

  create(data) {
    return http.post("/vehicles", data, {
      headers: getHeaders(),
    });
  }

  update(id, data) {
    return http.put(`/vehicles/${id}`, data, {
      headers: getHeaders(),
    });
  }

  delete(id) {
    return http.delete(`/vehicles/${id}`, {
      headers: getHeaders(),
    });
  }
}

const vehicleDataServiceInstance = new VehicleDataService();
export default vehicleDataServiceInstance;
