<?php

namespace Drupal\dadi\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\CssCommand;
use Drupal\commerce_product\Entity\ProductVariation as Entity;

/**
 * Class WishlistAjaxLinkController.
 */
class WishlistAjaxLinkController extends ControllerBase {

  /**
   * Add to wishlist.
   *
   * @return string
   */
  public function addToWishlist($id) {
    # New response
    $response = new AjaxResponse();
    $this->createWishItem($id);
    # Commands Ajax
    $response->addCommand(new CssCommand('#variation-' . $id, ['color' => 'red']));

    # Return response
    return $response;
  }

  /**
   * @param $id
   */
  public function createWishItem($id){

    $entity = Entity::load($id);

    $wishlist_manager = \Drupal::service('commerce_wishlist.wishlist_manager');
    /** @var \Drupal\commerce_wishlist\WishlistProviderInterface $wishlist_provider */
    $wishlist_provider = \Drupal::service('commerce_wishlist.wishlist_provider');
    /** @var \Drupal\commerce_wishlist\Resolver\WishlistTypeResolverInterface $wishlist_type_resolver */
    $wishlist_type_resolver = \Drupal::service('commerce_wishlist.chain_wishlist_type_resolver');

    // Create the wishlist item.
    $wishlist_item = $wishlist_manager->createWishlistItem($entity, 1);

    // Determine the wishlist type to use.
    $wishlist_type = $wishlist_type_resolver->resolve($wishlist_item);

    // Use existing or create a new wishlist.
    $wishlist = $wishlist_provider->getWishlist($wishlist_type);
    if (!$wishlist) {
      $wishlist = $wishlist_provider->createWishlist($wishlist_type);
    }
    $wishlist_manager->addWishlistItem($wishlist, $wishlist_item, TRUE);
  }
}
