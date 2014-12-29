<?php
// www/index.php
require_once __DIR__ . '/../vendor/autoload.php';
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Routing\Loader\YamlFileLoader;
use Symfony\Component\Routing\RouteCollection;
use Silex\Application;
use \Doctrine\Common\Cache\ApcCache;
use \Doctrine\Common\Cache\ArrayCache;
use ColaRadio\Entity;
use Symfony\Component\HttpFoundation\Request;


$app = new Application();


$app['debug'] = 1;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../views',
));
$app['asset_path'] = '/assets';
$app['base_path'] = '';


$app->register(new DerAlex\Silex\YamlConfigServiceProvider(__DIR__ . '/../config/app.yml'));

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' =>  $app['config']['cola_db']

));
$app->register(new Silex\Provider\SessionServiceProvider());


// Register Doctrine ORM
$app->register(new Nutwerk\Provider\DoctrineORMServiceProvider(), array(
    'db.orm.proxies_dir'           => __DIR__ . '/../cache/doctrine/proxy',
    'db.orm.proxies_namespace'     => 'DoctrineProxy',
    'db.orm.cache'                 =>
        !$app['debug'] && extension_loaded('apc') ? new ApcCache() : new ArrayCache(),
    'db.orm.auto_generate_proxies' => true,
    'db.orm.entities'              => array(array(
        'type'      => 'annotation',       // entity definition
        'path'      => __DIR__ . '/../src/ColaRadio/Entity',   // path to your entity classes
        'namespace' => 'ColaRadio\Entity', // your classes namespace
    )),
));

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->register(new Silex\Provider\SecurityServiceProvider(), array(
    $app['security.firewalls'] = array(
        'login_path' => array(
            'pattern' => '^/(login)',
            'anonymous' => true
        ),
        'admin' => array(
            'logout' => array('logout_path' => '/admin/logout'),
            'pattern' => '^/',
            'form' => array('login_form' => '/login', 'check_path' => '/admin/login_check'),
            'users' => $app->share(function () use ($app) {
                    return new ColaRadio\UserProvider($app['db']);
                }),
        ),
    )
));
$app->boot();
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());


$app['routes'] = $app->extend('routes', function (RouteCollection $routes, Application $app) {
    $loader = new YamlFileLoader(new FileLocator(__DIR__ . '/../config'));
    $collection = $loader->load('routes.yml');
    $routes->addCollection($collection);

    return $routes;
});
$app->run();
