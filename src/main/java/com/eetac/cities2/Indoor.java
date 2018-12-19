package com.eetac.cities2;

import weka.core.converters.ConverterUtils.DataSource;
import weka.core.Instances;
import weka.filters.unsupervised.instance.imagefilter.PHOGFilter;
import weka.filters.Filter;
import weka.filters.unsupervised.attribute.Remove;
import weka.classifiers.bayes.NaiveBayes;
import weka.classifiers.trees.RandomForest;
import weka.core.Instance;
import weka.core.Attribute;
import weka.core.SparseInstance;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

public class Indoor {

    NaiveBayes naiveBayes;
    RandomForest randomForest;
    DataSource source;

    //crea la instancia Indoor !!ATENCIO!! al crear la instancia s'entrenen els classificadors
    //cosa que tarda bastant de temps, es recomana crear nomes una instancia i guardarla en una propietat estatica.
    public Indoor() throws Exception{
        source = new DataSource("datasets/indoor.arff");
        Instances data = source.getDataSet();
        if (data.classIndex() == -1)
            data.setClassIndex(data.numAttributes() - 1);

        // aplico el phogFilter
        String[] optionsPhog = new String[2];
        optionsPhog[0] = "-D";
        optionsPhog[1] = "datasets";

        PHOGFilter phog = new PHOGFilter();
        phog.setOptions(optionsPhog);
        System.out.println('a');
        phog.setInputFormat(data);
        System.out.println('b');
        Instances phogData = Filter.useFilter(data, phog);

        String[] optionsR = new String[2];
        optionsR[0] = "-R";
        optionsR[1] = "1";
        Remove remove = new Remove();
        remove.setOptions(optionsR);
        remove.setInputFormat(phogData);
        Instances phogClearData = Filter.useFilter(phogData, remove);

        naiveBayes = new NaiveBayes();
        naiveBayes.buildClassifier(phogClearData);

        // entreno el algoritme per a la resta
        randomForest = new RandomForest();
        String options = "-P 100 -I 100 -num-slots 1 -K 0 -M 1.0 -V 0.001 -S 1";
        randomForest.setOptions(options.split(" "));
        randomForest.buildClassifier(phogClearData);

    }

    public double classifica(String filename,String path) throws Exception{

        ArrayList<Attribute> attributes = new ArrayList<Attribute>();
        Instances templete = source.getDataSet();

        for(int x=0;x<templete.numAttributes();x++){
            attributes.add(templete.attribute(x));
        }

        Instances dataRaw = new Instances("Instancia", attributes, 0);
        dataRaw.setClassIndex(1);
        /*System.out.println("Before adding any instance");
        System.out.println("--------------------------");
        System.out.println(dataRaw);
        System.out.println("--------------------------");*/

        double[] instanceValue1 = new double[dataRaw.numAttributes()];
        instanceValue1[0] = dataRaw.attribute(0).addStringValue(filename);
        instanceValue1[1] = 2;

        dataRaw.add(new SparseInstance(1.0, instanceValue1));
        //System.out.println("added isntance");
        //System.out.println(dataRaw);

        String[] optionsPhog = new String[2];
        optionsPhog[0] = "-D";
        optionsPhog[1] = path;
        PHOGFilter phog = new PHOGFilter();
        phog.setOptions(optionsPhog);
        phog.setInputFormat(dataRaw);
        Instances phogData = Filter.useFilter(dataRaw, phog);
        //System.out.println("apply phog filter");

        //System.out.println(phogData);
        String[] optionsR = new String[2];
        optionsR[0] = "-R";
        optionsR[1] = "1";
        Remove remove = new Remove();
        remove.setOptions(optionsR);
        remove.setInputFormat(phogData);
        Instances phogClearData = Filter.useFilter(phogData, remove);
        //System.out.println("remove attribute 1");
        //System.out.println(phogClearData);

        double d = naiveBayes.classifyInstance(phogClearData.firstInstance());
        if(d==1.0){
            return 1.0;
        }
        d = randomForest.classifyInstance(phogClearData.firstInstance());
        return d;
    }

    public String statistics() throws Exception {
        // carrego el datasource
        DataSource source = new DataSource("datasets/indoor.arff");
        Instances data = source.getDataSet();
        if (data.classIndex() == -1)
            data.setClassIndex(data.numAttributes() - 1);
        System.out.print(data.numInstances());

        // aplico el phogFilter
        String[] optionsPhog = new String[2];
        optionsPhog[0] = "-D";
        optionsPhog[1] = "datasets";
        PHOGFilter phog = new PHOGFilter();
        phog.setOptions(optionsPhog);
        phog.setInputFormat(data);
        Instances phogData = Filter.useFilter(data, phog);

        // elimino el atribut que representa la direcció de la imatge
        String[] optionsR = new String[2];
        optionsR[0] = "-R";
        optionsR[1] = "1";
        Remove remove = new Remove();
        remove.setOptions(optionsR);
        remove.setInputFormat(phogData);
        Instances phogClearData = Filter.useFilter(phogData, remove);

        Random rand = new Random(30);
        Instances randData = new Instances(phogClearData);
        randData.randomize(rand);

        int numFolds = 10;//divideixo el dataset amb 10 troços
        double correctClassified = 0;
        double incorrectClassified = 0;
        double[][] matrix = {{0,0,0},{0,0,0},{0,0,0}};

        for (int fold = 0; fold < numFolds; fold++) {
            // divideixo el dataset en un dataset de entrenament i un de test
            /**
             *    * testDataset
             *    + trainDataset
             *
             * fold = 0 dataset es dividiria com a *++++++++++
             * fold = 1 dataset es dividiria com a +*+++++++++
             * fold = 2 dataset es dividiria com a ++*++++++++
             * fold = 3 dataset es dividiria com a +++*+++++++
             * fold = 4 dataset es dividiria com a ++++*++++++
             * fold = 5 dataset es dividiria com a +++++*+++++
             * etz
             */
            Instances testData = randData.testCV(numFolds, fold);
            Instances trainData = randData.trainCV(numFolds, fold, rand);

            // entreno el algoritme que buscara les flors
            NaiveBayes naiveBayes = new NaiveBayes();
            naiveBayes.buildClassifier(trainData);

            // entreno el algoritme per a la resta
            RandomForest randomForest = new RandomForest();
            String options = "-P 100 -I 100 -num-slots 1 -K 0 -M 1.0 -V 0.001 -S 1";
            randomForest.setOptions(options.split(" "));
            randomForest.buildClassifier(trainData);
            System.out.println("build fold: "+fold);

            for (Instance instance : testData) {
                //classifico per trobar les floristeries
                double d = naiveBayes.classifyInstance(instance);

                //miro si es una floristeria
                if (d == 1.0) {
                    //miro si la floristeria ha estat classificada be
                    if (instance.classValue() == 1.0) {
                        correctClassified++;
                        matrix[1][1]++;
                    } else {
                        matrix[1][(int)d]++;
                        incorrectClassified++;
                    }
                }
                //miro les instancies que no han sortit com a floristeria
                else {
                    d = randomForest.classifyInstance(instance);
                    //miro si han estat ben classificades
                    if (d == instance.classValue()) {
                        correctClassified++;
                    } else {
                        incorrectClassified++;
                    }
                    matrix[(int)instance.classValue()][(int)d]++;
                }
            }

            System.out.println("test fold: "+fold);
        }
        System.out.println("Correctly Classified Instances "+correctClassified / (correctClassified + incorrectClassified));
        System.out.println("Matrix:");
        System.out.println(Arrays.toString(matrix[0]));
        System.out.println(Arrays.toString(matrix[1]));
        System.out.println(Arrays.toString(matrix[2]));

        return +correctClassified / (correctClassified + incorrectClassified)+Arrays.toString(matrix[0])+Arrays.toString(matrix[1])+Arrays.toString(matrix[2]);
}

    public static void main(String[] args) throws Exception {
        System.out.println("entrena!!");
        Indoor indoor = new Indoor();
        System.out.println("classifica!!");
        double d = indoor.classifica("ascensor.jpeg", "cities2-weka-classificadors/test");
        System.out.println("ascensor==0?"+d);

        d = indoor.classifica("floristeria.jpg", "cities2-weka-classificadors/test");
        System.out.println("floristeria==1?"+d);

        d = indoor.classifica("armario.jpeg", "cities2-weka-classificadors/test");
        System.out.println("armario==2?"+d);
    }

    public static void main2(String[] args) throws Exception {
        Indoor indoor = new Indoor();
        String statistics = indoor.statistics();
        System.out.println(statistics);
    }
}