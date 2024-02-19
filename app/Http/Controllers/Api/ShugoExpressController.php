<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use App\Http\Requests\PurchaseProductRequest;
use App\Services\VipService;

use Illuminate\Http\Request;

class ShugoExpressController extends Controller
{

    protected $vipService;

    public function __construct(VipService $vipService)
    {
        $this->vipService = $vipService;
    }
    
    public function getProduct(Request $request) {

        $products = Product::all()
            ->sortByDesc('vip')
            ->sortBy([
                'category' => 'asc',
                'created_at' => 'asc',
            ])
            ->where('active', 1);


        return ProductResource::collection($products);

    }

    public function productPurchase(PurchaseProductRequest $request) {

        $data = $request->validated();
        $user = $request->user();

        $product = Product::find($data['id']);

        if($product->vip){

            $status = $this->vipService->vipConnection($user, $product);

        }else {

            $status = "just product, need service for buy";
            
        }
        
        return response(compact('product', 'user', 'status'));
    }
}
