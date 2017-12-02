<?php
namespace Drupal\dadi\Plugin\views\argument_default;

use Drupal\Core\Cache\Cache;
use Drupal\Core\Cache\CacheableDependencyInterface;
use Drupal\views\Plugin\views\argument_default\ArgumentDefaultPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\commerce_wishlist\WishlistProviderInterface;


/**
 * Default argument plugin to extract the current wishlist
 *
 * This plugin actually has no options so it does not need to do a great deal.
 *
 * @ViewsArgumentDefault(
 *   id = "current_wishlist",
 *   title = @Translation("Wishlist ID for current user")
 * )
 */
class CurrentWishlist extends ArgumentDefaultPluginBase implements CacheableDependencyInterface {

  /**
   * @var \Drupal\commerce_wishlist\WishlistProviderInterface
   */
  protected $wishlistProvider;

  /**
   * CurrentWishlist constructor.
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   * @param \Drupal\commerce_wishlist\WishlistProviderInterface $wishlist_provider
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, WishlistProviderInterface $wishlist_provider) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->wishlistProvider = $wishlist_provider;
  }
  
  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('commerce_wishlist.wishlist_provider')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getArgument() {
    return $this->getWishlistId();
  }

  /**
   * @return int|string
   */
  protected function getWishlistId(){
    $id = 0;
    $wishlists = $this->wishlistProvider->getWishlists();
    $wishlists = array_filter($wishlists, function ($wishlist) {
      /** @var \Drupal\commerce_wishlist\Entity\WishlistInterface $wishlist */
      return $wishlist->hasItems();
    });
    if (!empty($wishlists)) {
      foreach ($wishlists as $wishlist_id => $wishlist) {
        $id = $wishlist_id;
      }
    }
    return $id;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheMaxAge() {
    return Cache::PERMANENT;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    return ['user', 'session'];
  }
}