import { createMarket, updateMarket } from "../repositories/market.repository";

export async function registerMarket (name: string){
  return await createMarket(name)
}

